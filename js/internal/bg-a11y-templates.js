this["a11y"] = this["a11y"] || {};
this["a11y"]["templates"] = this["a11y"]["templates"] || {};
this["a11y"]["templates"]["palette-table"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return "class=\"visuallyhidden\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <td class=\"palette-table__col\">\n          <div class=\"palette-table__col-item compliance-indicators__item"
    + alias4(((helper = (helper = helpers.stateModifier || (depth0 != null ? depth0.stateModifier : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stateModifier","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.perc : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n        </td>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"palette-table__percentage\">"
    + container.escapeExpression(((helper = (helper = helpers.perc || (depth0 != null ? depth0.perc : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"perc","hash":{},"data":data}) : helper)))
    + "% Compliant</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<table class=\"palette-table\">\n  <thead "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.headerVisible : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n    <tr>\n      <th class=\"palette-table__col palette-table__col--header palette-table__color\">\n        <div class=\"palette-table__col-title palette-table__col-item--color\">Colour</div>\n      </th>\n      <th class=\"palette-table__col palette-table__col--header palette-table__aa\">\n        <div class=\"palette-table__col-title\">AA</div>\n      </th>\n      <th class=\"palette-table__col palette-table__col--header palette-table__aaPlus\">\n        <div class=\"palette-table__col-title\">AA (18pt +)</div>\n      </th>\n      <th class=\"palette-table__col palette-table__col--header palette-table__aaa\">\n        <div class=\"palette-table__col-title\">AAA</div>\n      </th>\n      <th class=\"palette-table__col palette-table__col--header palette-table__aaaPlus\">\n        <div class=\"palette-table__col-title\">AAA (18pt +)</div>\n      </th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class=\"palette-table__col palette-table__color\">\n        <div class=\"palette__item-color palette-table__col-item palette-table__col-item--color\" style=\"background-color: "
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + ";\" data-label>Colour<span class=\"palette__item-color-text\">"
    + alias4(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data}) : helper)))
    + "</span></div>\n      </td>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.indicator : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tr>\n  </tbody>\n</table>\n";
},"useData":true});