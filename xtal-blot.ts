export interface IXtalBlotProperties {
    fontStyle: object;
}
declare global {
    interface Window {
        xtal_blot: HTMLLinkElement
    }
}

declare class Blotter{
    constructor(a:any, b: any);
    forText(a:any);
}

declare namespace Blotter{
    class Text{
        constructor(s: string, a: any);
    }
    
    class Material{}
    class LiquidDistortMaterial{}
}

(function () {

    const baseTagName = 'xtal-blot-';
    const materials = ['liquidDistort', 'flies', 'channelSplit', 'rollingDistort', 'slidingDoor'];
    //if (customElements.get(baseTagName)) return;
    const cs_src = self.xtal_blot ? self.xtal_blot.href : (document.currentScript as HTMLScriptElement).src;
    const pathTokens = cs_src.split('/'); pathTokens.pop();
    const basePath = pathTokens.join('/');
    const pathToBlotter = basePath + '/blotter.min.js';
    const script = document.createElement('script');
    script.src = pathToBlotter;
    script.addEventListener('load', e => {
        materials.forEach(material =>{
            loadLiquidDistortMaterial(material);
        })
       
    });
    document.head.appendChild(script);
    function loadLiquidDistortMaterial(suffix: string){
        const script = document.createElement('script');
        // script.src = basePath + '/materials/liquidDistortMaterial.js';
        script.src = basePath + '/materials/' + suffix + 'Material.js';
        script.addEventListener('load', e => {
            initXtalBlot(suffix);
        });
        document.head.appendChild(script);
    }
    function initXtalBlot(suffix: string) {
        if(customElements.get(baseTagName + suffix)) return;
        class XtalBlot extends HTMLElement {
            _material: string;
            connectedCallback() {
                // BLOTTER - Example 1
                var text = new Blotter.Text('observation', {
                    family: "'EB Garamond', serif",
                    size: 27,
                    fill: "#202020"
                });

                //var material = new Blotter.Material();
                //const material = new Blotter.LiquidDistortMaterial();
                //debugger;
                const material = new Blotter[this._material.substr(0, 1).toUpperCase() + this._material.substr(1) + 'Material']();
                material['uniforms'].uSpeed.value = 0.25;
                var blotter = new Blotter(material, {
                    texts: text
                });

                //var elem = document.getElementById("plain-text");
                var scope = blotter.forText(text);

                scope.appendTo(this);
            }
        }
        customElements.define(baseTagName + suffix.replace('M', '-m').replace('D', '-d').replace('S', '-s'), class extends XtalBlot{
            constructor(){
                super();
                this._material = suffix;
            }
        });
    }

})();