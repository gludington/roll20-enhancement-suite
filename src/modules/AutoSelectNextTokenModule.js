import { R20Module } from "../tools/R20Module";
import { R20 } from "../tools/R20";

class AutoSelectNextTokenModule extends R20Module.SimpleBase {
    setup() {

        window.r20es.selectInitiativeToken = function (data) {
            if(!data.id) return;

            let obj = R20.getCurrentPageTokenByUUID(data.id);

            if (obj) {
                R20.selectToken(obj);
            }
        }
    }

    dispose() {
        window.r20es.selectInitiativeToken = null;
    }
}

if (R20Module.canInstall()) new AutoSelectNextTokenModule(__filename).install();

const hook = R20Module.makeHook(__filename,{
    id: "autoSelectNextToken",
    name: "Select token on its turn",
    description: "Automatically selects a token on it's turn",
    category: R20Module.category.initiative,
    gmOnly: true,

    includes: "assets/app.js",
    find: "e.push(t[0]);",
    patch: "e.push(t[0]);if(window.r20es && window.r20es.selectInitiativeToken) { window.r20es.selectInitiativeToken(e[0]);}"
});

export { hook as AutoSelectNextTokenHook }