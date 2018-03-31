(function () {
    const tagName = 'xtal-blot';
    if (customElements.get(tagName))
        return;
    const cs_src = self.xtal_blot ? self.xtal_blot.href : document.currentScript.src;
    const pathTokens = cs_src.split('/');
    pathTokens.pop();
    const basePath = pathTokens.join('/');
    const pathToBlotter = basePath + '/blotter.min.js';
    const script = document.createElement('script');
    script.src = pathToBlotter;
    script.addEventListener('load', e => {
        loadLiquidDistortMaterial();
    });
    document.head.appendChild(script);
    function loadLiquidDistortMaterial() {
        const script = document.createElement('script');
        script.src = basePath + '/materials/liquidDistortMaterial.js';
        script.addEventListener('load', e => {
            initXtalBlot();
        });
        document.head.appendChild(script);
    }
    function initXtalBlot() {
        class XtalBlot extends HTMLElement {
            connectedCallback() {
                // BLOTTER - Example 1
                var text = new Blotter.Text("observation", {
                    family: "'EB Garamond', serif",
                    size: 27,
                    fill: "#202020"
                });
                //var material = new Blotter.Material();
                const material = new Blotter.LiquidDistortMaterial();
                material['uniforms'].uSpeed.value = 0.25;
                var blotter = new Blotter(material, {
                    texts: text
                });
                //var elem = document.getElementById("plain-text");
                var scope = blotter.forText(text);
                scope.appendTo(this);
            }
        }
        customElements.define(tagName, XtalBlot);
    }
})();
//# sourceMappingURL=xtal-blot.js.map