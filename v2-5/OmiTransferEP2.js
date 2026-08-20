/*:
 * @plugindesc Omi transfer system for RouxnoBlue Episode 2
 * @author PadTM Studios
 *
 * @help
 * Usage in events:
 *   Script: TransferSystem.importParty();
 */

var TransferSystem = TransferSystem || {};

(function() {
  const fs = require('fs');
  const path = require('path');
  const transferPath = path.join(path.dirname(process.mainModule.filename), "../RouxnoBlue/transfer.json");

  const idMap = {
    5: 10,   // Nideho
    7: 14,   // Ai
    8: 15,   // Ooh
    9: 21,   // Cryieng
    10: 8, // Icebell
    12: 32, // Jezzater
    13: 4, // Dog-mo
    19: 3, // Jungnu
    20: 43, // Beth
    21: 22, // Poster
    22: 19  // Littleapple
  };

  TransferSystem.importParty = function() {
    try {
      let data = fs.readFileSync(transferPath, 'utf8');
      let importedActors = JSON.parse(data);

      importedActors.forEach(actor => {
        let newId = idMap[actor.id];
        if (newId) {
          let newActor = $gameActors.actor(newId);

          if (newActor) {
            if (!$gameParty.members().some(a => a.actorId() === newId)) {
              $gameParty.addActor(newId);
              console.log("Added to party: " + newActor.name() + " (ID " + newId + ")");
            } else {
              console.log("Already in party: " + newActor.name() + " (ID " + newId + ")");
            }

            newActor.changeLevel(actor.level, false);
            newActor.setHp(actor.hp);
            newActor.setMp(actor.mp);

            console.log("Imported stats for: " + actor.name + " → ID " + newId);
          } else {
            console.warn("Actor ID " + newId + " not found in database!");
          }
        } else {
          console.log("Skipped: " + actor.name + " (no mapping)");
        }
      });

      $gameMessage.add("Your Omi successfully returned to you!");
    } catch (err) {
      console.error("Error importing transfer.json:", err);
      $gameMessage.add("Bruh, something went wrong");
    }
  };
})();

