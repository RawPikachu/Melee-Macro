/*
Wynncraft Melee Macro by WaiZ and Rikko (https://github.com/richard-marc)
https://github.com/CoolBvll/Melee-Macro

Updated to 2.1 + class detection by RawPikachu
https://github.com/RawPikachu/Melee-Macro
*/

// lll                          llr                       lrr                   lrl
// |󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|

// rrr                    rrl                    rll                     rlr
// |󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|󏿠    󏿠,󏿠    󏿠,󏿠    󏿠|

if (!World.isWorldLoaded()) JsMacros.waitForEvent('ChunkLoad');

var mouseDown = false;
var SpellDetected = false;

// Checks if the user started a spell.
JsMacros.on('Title', JavaWrapper.methodToJava(event => {
    let actionBar = event.message.withoutFormatting();
    let text = actionBar.getString()

    if (text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠") || text.includes("󏿠    󏿠")) {
        SpellDetected = false;
    } else if (text.includes("󏿠")) {
        SpellDetected = true;
    } else {
        SpellDetected = false;
    }
}));

//The Macro itself.
JsMacros.on('Key', true, JavaWrapper.methodToJava((event, context) => {
    var heldItemLore = Player.getPlayer().getMainHand().getLore()

    if (heldItemLore.some(function(str) {
        return str.getString().includes("Class Req: Archer/Hunter");
    })) {
        if (event.action === 1 && event.key == "key.mouse.right") {
            var timer = 0;
            mouseDown = true;
            context.releaseLock();

            do {
                timer++;
                KeyBind.releaseKeyBind('key.interact');
                if (SpellDetected) {
                    Time.sleep(1);
                } else {
                    Player.getPlayer().interact();
                    Time.sleep(50);
                }
            } while (mouseDown);

        } else if (event.action === 0 && event.key == "key.mouse.right") {
            mouseDown = false;
        }
    } else if (heldItemLore.some(function(str) {
        return str.getString().includes("Class Req: ");
    })) {
        if (event.action === 1 && event.key == "key.mouse.left") {
            var timer = 0;
            mouseDown = true;
            context.releaseLock();

            do {
                timer++;
                KeyBind.releaseKeyBind('key.attack');
                if (SpellDetected) {
                    Time.sleep(1);
                } else {
                    Player.getPlayer().attack();
                    Time.sleep(50);
                }
            } while (mouseDown);

        } else if (event.action === 0 && event.key == "key.mouse.left") {
            mouseDown = false;
        }
    }
}));
