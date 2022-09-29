(function ( $ ) {
///

// constants
const CONTAINER_ID = 'container'
const SHADOW_TEXT_ID = 'shadow-text'
const SHADOW_TEXT_CONTAINER_ID = 'shadow-text-container'
const SHADOW_INITIAL_STYLES_ID = 'shadow-initial-styles'
const SHADOW_STYLES_ID = 'shadow-styles'
const SCROLL_CONTAINER_ID = 'scroll-container'
const CONTAINER_CLASS = CONTAINER_ID
const SHADOW_TEXT_CLASS = SHADOW_TEXT_ID
const SHADOW_TEXT_CONTAINER_CLASS = SHADOW_TEXT_CONTAINER_ID
const SCROLL_CONTAINER_CLASS = SCROLL_CONTAINER_ID
const READY_CLASS = 'input-highlight-ready'
const SYNC_CLASS = 'input-highlight-sync'
const TEXT_CSS_PROPS = [
  'color',
  'direction',
  'font-family',
  'font-size',
  'font-stretch',
  'font-style',
  'font-variant-cap',
  'font-variant-east-asian',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-weight',
  'letter-spacing',
  'line-height',
  'tab-size',
  'text-align',
  'text-align-last',
  'text-decoration-color',
  'text-decoration-line',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-indent',
  'text-overflow',
  'text-shadow',
  'text-size-adjust',
  'text-transform',
  'vertical-align',
  'white-space',
  'word-break',
  'word-spacing',
]

const utils = {
  documentReady: (cb) => {
    if (document.readyState != 'loading') {
      cb()
    } else {
      document.addEventListener('DOMContentLoaded', cb)
    }
  },
  throttle: (fn) => {
    let isThrottled = false
    return (...args) => {
      if (!isThrottled) {
        isThrottled = true
        window.requestAnimationFrame(() => { isThrottled = false })
        fn(...args)
      }
    }
  },
  empty: el => {
    while (el.firstChild) {
      el.removeChild(el.firstChild)
    }
  },
  escape: (() => {
    const reUnescapedHtml = /[&<>"']/g;
    const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    const replacer = key => htmlEscapes == null ? undefined : htmlEscapes[key]
    return str => (str && reHasUnescapedHtml.test(str))
      ? str.replace(reUnescapedHtml, replacer)
      : str
  })(),
  camelCase: str => str
    .toLowerCase()
    .replace(/[_-\s]/g, ' ')
    .split(' ')
    .map((word, i) => i === 0 ? word : `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(''),
  html: str => {
    const tpl = document.createElement('template');
    tpl.innerHTML = str;

    const clone = tpl.content.cloneNode(true);
    return clone.childNodes.length === 1
      ? clone.firstChild
      : clone
  },
}

const styles = (`
  :host {
    display: contents !important;
  }

  :host(.input-highlight-ready) ::slotted(input),
  :host(.input-highlight-ready) ::slotted(textarea) {
    color: transparent !important;
  }

  :host(.input-highlight-sync) ::slotted(input),
  :host(.input-highlight-sync) ::slotted(textarea) {
    transition: color 0s 0s !important;
  }

  .${CONTAINER_CLASS} {
    position: relative;
    transform: translate3d(0px, 0px, 0px);
  }
  .${SHADOW_TEXT_CONTAINER_CLASS} {
    box-sizing: content-box;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    border: 0;
    overflow: hidden;
    z-index: 999;
    contain: layout paint size;
  }
  .${SCROLL_CONTAINER_CLASS} .${SHADOW_TEXT_CLASS} {
    white-space: nowrap;
    display: inline;
  }
  .${SHADOW_TEXT_CLASS} mark {
    color: red;
    font-style: inherit;
    text-decoration: underline;
    background-color: transparent;
  }
  .${SCROLL_CONTAINER_CLASS} {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  `
)

// 'hack' to keep the color transparent even when the browser adds its
// own un-overwriteable autofill styles
const fix = utils.html(`<style>
  input-highlight :is(input, textarea):-webkit-autofill,
  input-highlight :is(input, textarea):-webkit-autofill:focus {
    transition: color 600000s 0s;
  }
</style>`)

const template = utils.html(`
  <style id="${SHADOW_STYLES_ID}"></style>
  <style id="${SHADOW_INITIAL_STYLES_ID}">${styles}</style>
  <div id="${CONTAINER_ID}" class="${CONTAINER_CLASS}">
    <slot></slot>
    <div id="${SHADOW_TEXT_CONTAINER_ID}" class="${SHADOW_TEXT_CONTAINER_CLASS}" aria-hidden="true">
      <div id="${SCROLL_CONTAINER_ID}" class="${SCROLL_CONTAINER_CLASS}">
        <div id="${SHADOW_TEXT_ID}" class="${SHADOW_TEXT_CLASS}"></div>
      </div>
    </div>
  </div>
`)

class InputHighlight extends HTMLElement {
  constructor() {
    super()
    this
      .attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true))

    this.container = this.shadowRoot.getElementById(CONTAINER_ID)
    this.shadowInitialStylesEl = this.shadowRoot.getElementById(SHADOW_INITIAL_STYLES_ID)
    this.shadowStylesEl = this.shadowRoot.getElementById(SHADOW_STYLES_ID)
    this.shadowTextContainerEl = this.shadowRoot.getElementById(SHADOW_TEXT_CONTAINER_ID)
    this.scrollContainerEl = this.shadowRoot.getElementById(SCROLL_CONTAINER_ID)
    this.shadowTextEl = this.shadowRoot.getElementById(SHADOW_TEXT_ID)

    if (!fix.parentElement) {
      document.head.appendChild(fix)
    }
  }

  observers = {
    childList: new MutationObserver((mutations) => {
      mutations.forEach(() => {
        this.childListChangedCallback()
      })
    }),
    inputAttribute: new MutationObserver((mutations) => {
      mutations.forEach(({ attributeName, oldValue, newValue }) => {
        this.inputAttributeChangedCallback(attributeName, oldValue, newValue)
      })
    }),
    inputResize: new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === this.inputEl) {
          this.inputResizedCallback(entry)
        }
      }
    })
  }

  static get observedAttributes() {
    return ['pattern', 'highlight']
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue
    this.value = this.value
  }

  static get observedInputAttributes() {
    return ['value', 'class', 'type', 'style', 'data-pattern', 'data-highlight']
  }

  inputAttributeChangedCallback(name, _, newValue) {
    const attr = name.replace(/^data-/, '')
    if (name === 'value') {
      this.value = this.inputEl.value ?? this.inputEl.getAttribute('value') ?? ''
    } else if (name === 'class' || name === 'style' || name === 'type') {
      this.syncStyles()
    } else {
      this.setAttribute(attr, newValue)
    }
  }

  childListChangedCallback() {
    this.inputEl = this.querySelector('input, textarea')
  }

  inputResizedCallback = utils.throttle((value) => {
    const cs = window.getComputedStyle(value.target)
    const rects = {
      input: value.target.getBoundingClientRect(),
      shadow: this.container.getBoundingClientRect()
    }

    const border = {
      top: parseFloat(cs.borderTopWidth),
      right: parseFloat(cs.borderRightWidth),
      bottom: parseFloat(cs.borderBottomWidth),
      left: parseFloat(cs.borderLeftWidth),
    }

    const padding = {
      top: parseFloat(cs.paddingTop),
      right: parseFloat(cs.paddingRight),
      bottom: parseFloat(cs.paddingBottom),
      left: parseFloat(cs.paddingLeft),
    }

    Object.assign(
      this.shadowTextContainerEl.style,
      {
        paddingTop: `${border.top + padding.top}px`,
        paddingLeft: `${border.left + padding.left}px`,
        paddingRight: `${border.right + padding.right}px`,
        paddingBottom: `${border.bottom + padding.bottom}px`, 
        width: `${value.target.clientWidth - (padding.left + padding.right)}px`,
        height: `${value.target.clientHeight - (padding.top + padding.bottom)}px`,
        top: `${rects.input.top - rects.shadow.top}px`,
        left: `${rects.input.left - rects.shadow.left}px`
      }
    )
  })

  inputScrolledCallback = utils.throttle(() => {
    window.requestAnimationFrame(() => {
      this.shadowTextEl.parentElement.scrollTop = this.inputEl.scrollTop
      this.shadowTextEl.parentElement.scrollLeft = this.inputEl.scrollLeft
    })
  })

  connectedCallback() {
    this.childListChangedCallback()
    this.observers.childList.observe(this, { childList: true, attributes: false })
  }

  get type() {
    const { nodeName } = this.inputEl ?? {}
    if (nodeName === 'TEXTAREA') {
      return 'textarea'
    }
    if (nodeName === 'INPUT' && this.inputEl?.type === 'text') {
      return 'input'
    }
  }

  syncStyles() {
    const componentStyles = window.getComputedStyle(this)
    const boxSizing = [...this.shadowInitialStylesEl.sheet.cssRules]
      .find(rule => rule.selectorText === 'slot')
      ?.style.boxSizing

    if (boxSizing !== componentStyles.boxSizing) {
      this.shadowInitialStylesEl.textContent = styles + `
        slot {
          box-sizing: ${componentStyles.boxSizing};
        }
      `
    }

    if (this.inputEl) {
      this.classList.add(SYNC_CLASS)
      this.classList.remove(READY_CLASS)
      const inputStyles = window.getComputedStyle(this.inputEl)
    
      // force carrot color
      this.style.caretColor = inputStyles.caretColor

      if (!this.type) {
        this.shadowStylesEl.textContent = `.${SHADOW_TEXT_CONTAINER_CLASS} { display: none; }`
      } else {
        // copy text styles to shadowText element
        this.shadowStylesEl.textContent = (`
        .${SHADOW_TEXT_CLASS} {
          ${TEXT_CSS_PROPS
            .filter(prop => inputStyles[prop] !== undefined)
            .map(prop => `${prop}: ${inputStyles[prop]};`)
            .join("\n")
          }
        }
        `)
        this.classList.add(READY_CLASS)
      }
      
      this.classList.remove(SYNC_CLASS)
    }
  }

  get highlight() {
    return this._highlight === 'matched'
      ? this._highlight
      : 'unmatched'
  }

  set highlight(value) {
    this._highlight = value
  }

  get inputEl() {
    return this._inputEl
  }

  set inputEl(inputEl) {
    const prev = this._inputEl
    this._inputEl = inputEl

    if (inputEl === prev) {
      return
    }
  
    if (this.type) {
      // add/remove scroll container if needed
      if (prev?.nodeName !== this.inputEl.nodeName) {
        utils.empty(this.shadowTextContainerEl)
        if (this.inputEl.nodeName === 'INPUT') {
          this.shadowTextContainerEl.appendChild(this.scrollContainerEl)
          this.scrollContainerEl.appendChild(this.shadowTextEl)
        } else if (this.inputEl.nodeName === 'TEXTAREA') {
          this.shadowTextContainerEl.appendChild(this.shadowTextEl)
        }
      }

      this.syncStyles()

      // sync value each time the input triggers these events
      ;['input', 'change', 'blur'].forEach(event => {
        this.inputEl.addEventListener(event, () => {
          this.inputAttributeChangedCallback('value', this.value, this.inputEl.value)
        })
      })

      // sync scroll position
      ;['input', 'change', 'blur', 'keydown', 'mousedown', 'scroll'].forEach(event => {
        this.inputEl.addEventListener(event, this.inputScrolledCallback)
      })

      // observe changes to the input 'value' attribute
      this.observers.inputAttribute.disconnect()
      this.observers.inputAttribute.observe(
        this.inputEl,
        { attributeFilter: InputHighlight.observedInputAttributes }
      )

      // initialize the attributes
      InputHighlight.observedInputAttributes.forEach(name => {
        if (name === 'value' || this.inputEl.hasAttribute(name)) {
          this.inputAttributeChangedCallback(name, null, this.inputEl.getAttribute(name))
        }
      })

      // observe input element resize events
      this.observers.inputResize.disconnect()
      this.observers.inputResize.observe(this.inputEl)
      
      // initialize the element's size
      this.inputResizedCallback({ target: this.inputEl })
    }
  }

  get value() {
    return this._value
  }

  set value(text) {
    this._value = text

    if (!this.type) {
      this.shadowTextEl.innerHTML = ''
      return
    }

    if (!text || !this.pattern) {
      this.shadowTextEl.innerHTML = utils.escape(text)
      return
    }

    const highlightMatched = this.highlight === 'matched'
    const matches = text.match(new RegExp(this.pattern, 'g'))?.filter(item => !!item) ?? []
    const parts = []

    // if everything or nothing matches
    if (text === matches[0] || matches.length === 0) {
      const isMatch = text === matches[0]
      parts.push({
        value: text,
        shouldHighlight: highlightMatched ? isMatch : !isMatch
      })
    } else {
      // build the html by wrapping the text to be highlighted in <mark> elements
      let remaining = text
      matches.forEach((match, index) => {
        const [unmatched] = remaining.split(match, 1)
        remaining = remaining.substring(unmatched.length + match.length)
  
        // before the match
        parts.push({ value: unmatched, shouldHighlight: !highlightMatched })
        // the match
        parts.push({ value: match, shouldHighlight: highlightMatched })
        // after the match
        parts.push(index === matches.length - 1
          ? { value: remaining, shouldHighlight: !highlightMatched }
          : { value: '', shouldHighlight: false }
        )
      })
    }

    const shadowText = parts
      .map(({ value, shouldHighlight }) => {
        if (!value) {
          return ''
        }

        const escaped = this.type === 'input'
          ? utils.escape(value).replace(/ /g, '&nbsp;')
          : utils.escape(value)

        return shouldHighlight
          ? `<mark part="highlight" text="${escaped}">${escaped}</mark>`
          : `<span part="no-highlight" text="${escaped}">${escaped}</span>`
      })
      .join('')

    this.shadowTextEl.innerHTML = this.type === 'textarea'
      ? shadowText + '<br>'
      : shadowText
  }
}
  
customElements.define('input-highlight', InputHighlight);

// hook for use cases where it's easier to add attributes to an existing element
// than it is to wrap it in a custom element
utils.documentReady(() => {
  const tpl = utils.html('<input-highlight></input-highlight>')
  const elements = document.querySelectorAll([
    'input.input-highlight',
    'textarea.input-highlight',
    'input[data-pattern]',
    'textarea[data-pattern]'
  ].join(', '))

  elements.forEach(el => {
    let parent = el.parentElement

    if (parent.nodeName !== 'INPUT-HIGHLIGHT' && parent.classList.contains('input-group')) {
      el = parent
      parent = el.parentElement
    }

    if (parent.nodeName !== 'INPUT-HIGHLIGHT') {
      const wrapper = tpl.cloneNode(true)
      const sibling = el.previousSibling
      wrapper.appendChild(el)
      if (sibling) {
        parent.insertBefore(wrapper, sibling)
      } else {
        parent.prepend(wrapper)
      }
    }
  })
})

///
}( jQuery ));