//==============================================================================================================
//--------------------------------------------------------------------------------------------------------------
// *** MUSHROOMCAKE28'S ACHIEVEMENT SYSTEM P1
//  * Author: MushroomCake28
//  * Contact: last.truong@hotmail.com
//  * Version: 1.06 (2018-03-28) 
//--------------------------------------------------------------------------------------------------------------
// * INFO : This script is creating the achievement system. The main scene is accessible through the main menu. It
//          provides the player with the traditionnal achievements in-game. It is highly customizable by the developer
//          directly in the code.
// * USAGE : This plugin is available for public usage provided the developer accepts the terms of the license
//           of Kamo Studio Group, known as MushroomCake28 in the RPG Maker community.
//--------------------------------------------------------------------------------------------------------------
// * INSTRUCTIONS FOR USERS:
//   - There are no parameters and to customize this plugin, you must navigate through this plugin's code
//     directly.
//   - You can modify constant variables in section A.02. From section B to the end of the plugin, section A.01, modify at your own
//     risks. I will not be responsible in that case. The 2 modifiable parts are the Scene Detail and the Achievement List.
//     Use CTRL + F and search for:
//         + qwe789 (Scene Details).
//         + asdf087 (Achievements List).
//   - If you're having a hard time, go check my youtube video for this plugin. 
//   - The Window that pops on screen when you earn an achievement can only display 5 achievements at a time.
//   - Links:
//     + Youtube Video (tutorial): https://youtu.be/6lsGHnV1U4E
//     + Website (downloads):      https://www.kamostudiogroup.com/
//     + Facebook Page:            https://www.facebook.com/Kamo-Studio-Group-185550142221553/
//--------------------------------------------------------------------------------------------------------------
// UPDATE HISTORY:
// * v.1.01: (2018-03-28)
//   - First Release.
// * v.1.02: (2018-05-15)
//   - Added Pop Window Period to determine when to check for achievement completion.
// * v.1.03: (2018-07-25)
//   - Added the possibility to use a sprite for when an achievement is locked when using an image instead of an icon.
//   - Added the ability to disable pop out window when an achievement is completed.
// * v.1.04: (2018-11-18)
//   - Added the possibility to set a switch to turn ON and OFF the achievement scene and the attribution of achievements.
// * v.1.05: (2019-03-18)
//   - Fixed an issue where the pop window made the message window disappear.
//   - Added touch input support.
// * v.1.06 (2019-06-26)
//   - Added an auto-update method that will update achievement data changes mid-game. The check is done every time
//     the game is loaded and everytime the player enters the achievement scene. It will not reset the achievement to locked, meaning
//     that unlocked achievements will remain unlocked (even if the new condition is not meet). Note that the auto-update
//     will only check for changes in achievements with the same name. If you change the name of an achievement, it won't work and will
//     instead add a new achievement instead of replacing the old one. Be very careful with it. 
//--------------------------------------------------------------------------------------------------------------
// SECTIONS
// * Section A: Constant Variables (modifiable except Section A.01)
//           - A.01: Global Variables setting (DO NOT MODIFY)
//           - A.02: Constant Variables (MODIFY HERE, use ctrl + F and search qwe789 and asdf087)
// * Section B: Scenes
//           - B.01: Achievement Scene
//           - B.02: Scene Map
//           - B.03: Scene Menu
//           - B.04: Scene Load
// * Section C: Windows
//           - C.01: Window Achievement Title
//           - C.02: Window Achievement Command
//           - C.03: Window Achievement Pop
//           - C.04: Window Achievement Command 2
//           - C.05: Window Menu Command
// * Section D: Sprites 
//           - D.01: Sprite Image Logo
// * Section E: Game Objects
//           - E.01: Game Party
//==============================================================================================================
/*:
 * 
 * @plugindesc [v.1.06] Plugin runs the MushroomCake28 Achievement System
 * @author MushroomCake28
 * @help Just need to activate for it to work. Go directly in the plugin's code to 
 * customize the plugins. Refer to the youtube video if you need help.
 *
 * If you're having a hard time, check out my tutorial on this plugin on youtube:
 * Youtube Video (tutorial): https://youtu.be/6lsGHnV1U4E
 * 
 */

//==============================================================================================================
// * SECTION A.01: Global Variables
//   - DO NOT MODIFY!!!!
//==============================================================================================================

var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {}; 
Imported.mushFeatures['AchievementSystem_P1'] = 1.06;

var $mushFeatures = $mushFeatures || { 'imported': {}, 'params': {} };
$mushFeatures.imported['AchievementSystem_P1'] = 1.06;

//==============================================================================================================
// * SECTION A.02: Constant Variables
//   - MODIFY HERE
//==============================================================================================================

function MUSH_Achievements() {
	this.initialize.apply(this, arguments);
};

MUSH_Achievements.prototype.initialize = function() {
	this.createSceneDetails();
	this.createAchievementsList();
};

MUSH_Achievements.prototype.createSceneDetails = function() {
	//-------------------------------------------------------------------------------
	// * SCENE DETAILS (MODIFY HERE)
	//   - Code: qwe789
	//-------------------------------------------------------------------------------
	// * Modify the basic settings of the achievement scene here. The scene will be
	//   available through the menu
	//-------------------------------------------------------------------------------
	this._snDetails = {};

		//-----------------------------------------------
		// * Add To Menu
		//   - Decide wether or not to add the scene to the main menu
		//-----------------------------------------------
		this._snDetails.addToMenu = true;

		//-----------------------------------------------
		// * Switch for Achievements
		//   - If you want to deactivate the achievements from being given to the party.
		//   - Leave the switch to -1 if you don't want to use this setting.
		//   - If you set a switch, you won't be able to access the scene through menu when the
		//     switch is OFF. You also won't receive any achievement. 
		//     *** NOTE: It doesn't mean that your achievement progression won't continue when 
		//                the switch is off. Playtime for example will still continue to grow, but
		//                the party won't receive the achievement until the switch is ON.
		//-----------------------------------------------
		this._snDetails.switchForAch = -1;

		//-----------------------------------------------
		// * Complete Window Pop on Map 
		//   - Text that will appear in the window pop out on the map when
		//     completing an achievement.
		//-----------------------------------------------
		this._snDetails.textPop = "Completed: ";

		//-----------------------------------------------
		// * Allow Window pop on map
		//   - Set if you want a pop out window to appear on screen when completing an achievement.
		//-----------------------------------------------
		this._snDetails.allowPopWindow = true;

		//-----------------------------------------------
		// * Window Pop on Map Width
		//   - Set the width of the Window Pop on Map
		//-----------------------------------------------
		this._snDetails.wPopWidth = 600;

		//-----------------------------------------------
		// * Window Pop on Map Color
		//   - Set the 2 colors of the Window Pop on Map
		//   - Format: "rgba(red, green, blue, alpha"
		//   - for red, green and blue, value must be between 0 and 255.
		//   - For alpha, the value must be between 0 and 1 (decimal is ok)
		//-----------------------------------------------
		this._snDetails.wPopColor1 = "rgba(10, 10, 10, 0.7)";
		this._snDetails.wPopColor2 = "rgba(20, 20, 20, 0.5)";

		//-----------------------------------------------
		// * Window Pop on Map Period
		//   - Set the number of frames before the game checks if any additional achievements
		//     have been completed. Setting a low number will result on a slighty heavier
		//     load on the system's resources, but will check more frequently on achievements
		//   - Setting the number to 0 only checks for achievements once per map, only when
		//     a map.
		//-----------------------------------------------
		this._snDetails.wPopPeriod = 60;

		//-----------------------------------------------
		// * Set the scene default view
		//   - There are 2 scenes display with the possibility to toggle
		//     between both.
		//   - Default Scene View: between 1 and 2
		//   - Scene Toggle: true or false (gives the possibility or not to toggle
		//                   between the 2 scene views).
		//-----------------------------------------------
		this._snDetails.defaultSceneView = 2;
		this._snDetails.sceneToggle      = true;

		//-----------------------------------------------
		// * Title of the Scene
		//   - Text that will appear at the top of the scene in the Menu.
		//   - It will also be the name of the option in the menu if you 
		//     decide to make the scene accessible from the main menu.
		//-----------------------------------------------
		this._snDetails.sceneTitle = "Achievements";

		//-----------------------------------------------
		// * Description of the Scene
		//   - Text that will appear at the top of the scene in the Menu, under the title.
		//   - One line Max.
		//-----------------------------------------------
		this._snDetails.sceneDescription = "Press Z to toggle the scene view!";

		//-----------------------------------------------
		// * Icon when not unlocked
		//   - The icon index when an achievement isn't unlocked.
		//   - If you use a sprite, this icon won't matter as it won't show up.
		//-----------------------------------------------
		this._snDetails.iconNotUnlocked = 16;

		//-----------------------------------------------
		// * Sprite when not unlocked
		//   - Only applies if you use an image instead of an icon for the achievement graphic.
		//   - Leaving the string to "" will black out the image of the achievement when not unlocked
		//-----------------------------------------------
		this._snDetails.spriteNotUnlocked = "";

		//-----------------------------------------------
		// * Text color if an achievement isn't unlocked
		//   - Text that will appear at the top of the scene in the Menu, under the title.
		//   - The number represent the windowskin pixel color.
		//-----------------------------------------------
		this._snDetails.textColorNotUnlocked = 7;

		//-----------------------------------------------
		// * Text for Completion
		//   - Text for the Completion category naming.
		//-----------------------------------------------
		this._snDetails.textCompletion = "Completion: ";

		//-----------------------------------------------
		// * Colors for the completion bar
		//   - Set the 2 RGBA colors for the completion bar.
		//   - It's a gradient between the 2 colors
		//   - Format: "rgba(red, green, blue, alpha"
		//   - for red, green and blue, value must be between 0 and 255.
		//   - For alpha, the value must be between 0 and 1 (decimal is ok)
		//-----------------------------------------------
		this._snDetails.completionColor1 = "rgba(0, 255, 0, 1)";
		this._snDetails.completionColor2 = "rgba(0, 0, 255, 1)";

		//-----------------------------------------------
		// * Logo Size
		//   - The logo is squared, so will be VAR x VAR.
		//   - Select the logo size here, wether it is an icon or an image file.
		//   - For icons, it is recommended a number which is a factor of 32 (default icon size)
		//-----------------------------------------------
		this._snDetails.logoSize = 96;

		//-----------------------------------------------
		// * Show Reward
		//   - True or False. Showing the reward in the achievement menu will
		//     take one additional line. Bear that in mind for the height factor.
		//   - This is not about hiding (????), it's about not displaying at all.
		//-----------------------------------------------
		this._snDetails.showReward = true;

		//-----------------------------------------------
		// * Text for Reward
		//   - Text for the reward category naming and other reward related text.
		//   - Text for when there is no reward (you should set the Show Reward to false, previous variable)
		//-----------------------------------------------
		this._snDetails.textReward   = "Reward: ";
		this._snDetails.textNoReward = "None";

		//-----------------------------------------------
		// * Achievement Box Height
		//   - In the scene, how many times the regular Line Height (example other command windows)
		//     will an achievement box (rectangle) be? 1 = 1 x line height
		//   - Minimum of 2, or 3 if you show reward. It is at least one line for the achievement name, 
		//     one for the reward, and one for description. Expanding the box means more lines for the description.
		//-----------------------------------------------
		this._snDetails.heightFactor = 3;

	
	// END OF SCENE DETAIL (DO NOT MODY BEYOUND)
};

MUSH_Achievements.prototype.createAchievementsList = function() {
	var achList = [

	//-------------------------------------------------------------------------------
	// * ACHIEVEMENTS LIST (MODIFY HERE)
	//   - Code: asdf087
	//-------------------------------------------------------------------------------
	//
	// * Add achievements to the list by following the format:
	//   [name, icon index, image file, description, reward, condition, hideName, hideReward, hideDesc]
	//
	//   - name: Simply the name of the achievement
	//
	//   - icon index: If you don't use an image for achievement logo, it will by default an icon.
	//
	//   - image file: You can specify an image for the logo. Be sure that it's a square format image
	//                 since it's going to get resized if not the exact correct size. If you're not using
	//                 an image file, simply put "".
	//                 *** IMPORTANT: Put the image in the Picture Folder.
	//
	//   - description: The description that will appear under the achievement. Use '\n' to jump to 
	//                  the next line.
	//
	//   - reward: Use the format: "type/index/amount".
	//     + type: 0 for items, 1 for armors, 2 for weapons, 3 for gold. Set it to -1 for no reward.
	//     + index: index of the item, armor or weapon. 0 for gold.
	//     + amount: amount of time you receive the item, armor, or weapon. Or the amount of gold.
	//       Here are some examples:
	//       	"0/1/3"    = Receive item #1 from the database 3 times.
	//       	"1/5/1"    = Receive armor #5 from the database once.
	//          "2/10/5"   = Receive weapon #10 from the database 5 times.	
	//          "3/0/1000" = Receive 1000 gold.
	//          "-1/0/0"   = No reward
	//
	//   - condition: Sets the condition for gaining the achievement. Format: "type/value1/value2"
	//     + type 0 (for switches): If type = 0, the condition for earning the achievement is the activation
	//                              of a game switch, which number is specified by value1. So for example:
	//                              "0/5/0" = If game switch #5 == ON. Value2 isn't used here.
	//     + type 1 (for variables ==) If type = 1, the condition for earning the achievement is set by a game
	//                                 variables being equal to a value. Value1 determines the game variable and 
	//                                 value 2 determines the value to which its being compared to.
	//                                 Example: "1/3/10" = if variable #3 == 10.
	//     + type 2 (for variables >=) If type = 2, the condition for earning the achievement is set by a game
	//                                 variables being equal or greater to a value. Value1 determines the game variable and 
	//                                 value 2 determines the value to which its being compared to.
	//                                 Example: "2/7/12" = if variable #3 >= 10.
	//     + type 3 (for game time) The condition here is game playtime in frames. If the playtime in frames is greater
	//                              or equal to value1, the achievement is gained. Value2 has no incidence. So for example:
	//                              "3/3600/0" = if playtime >= 3600 frames, so if the player played 1 hour or more.
	//     + type 4 (for steps) The condition here is the number of steps the player took. Value1 determines the number of
	//                          steps necessary to gain the achievement. Value2 has no incidence. So for example:
	//                          "4/1000/0" = if player took 1000 steps or more.
	//
	//   - hideName: Set to true to hide the name when an anchievement isn't completed yet.
	//
	//   - hideReward: Set to true to hide the reward when an anchievement isn't completed yet.
	//
	//   - hideDesc: Set to true to hide the description when an anchievement isn't completed yet.
	//
	//-------------------------------------------------------------------------------

		["Start the Adventure!", 7, "Start the Adventure!",         "Just play and talk with Kite",              "3/0/15",   "0/1/0",  false, false, false] ,
		["Tutorial Clear", 7, "Tutorial Clear",         "Defeat Tony Da' Dummy",                            "3/0/10", "0/20/0",  false, false, false] ,
		["Shop Master", 7, "Shop Master",         "Buy something on Jose's Shop",                            "3/0/5", "0/26/0",  false, false, false] ,
		["Electronic City Clear", 7, "Electronic City Clear",         "Go to the Overworld",                            "3/0/5", "0/23/0",  false, false, false] ,
		["Beginner Collector", 7, "Beginner Collector",         "Buy some Omi on Eva's Shopy",                            "3/0/5", "0/22/0",  false, false, false] ,
		["Celesta City Clear", 7, "Celesta City Clear",         "Go to Laeten City",                            "3/0/15", "0/25/0",  false, false, false] ,
		["Laeten City Clear", 7, "Laeten City Clear",         "Go to Chiptune City",                            "3/0/15", "0/27/0",  false, false, false] ,
		["Let's Rockn'Roll", 47, "Let's Rockn'Roll",         "Access Concert Mode in Skuik City",                            "3/0/500", "0/18/0",  false, false, false] ,
		["Like 2015!", 47, "Like 2015",         "Find the door's code",                            "3/0/500", "0/24/0",  false, false, false] ,
		["Chiptune City Clear", 7, "Chiptune City Clear",         "Go to Industrial City",                            "3/0/15", "0/28/0",  false, false, false] ,
		["Expert Collector", 7, "Expert Collector",         "First Gacha Spin",                            "3/0/5", "0/29/0",  false, false, false] ,
		["CD Quiz!", 2, "CD Quiz!",         "Defeat Melissa's Quiz", "0/83/1",    "0/19/0", false, false, false],
		["Antivirus", 7, "Antivirus",         "Defeat CODE RNB and finish the game",                            "3/0/1000", "0/14/0",  false, false, true] ,
		["Her true looks", 7, "Her true looks",         "Defeat Amateras",                            "3/0/500", "0/21/0",  false, false, true] ,
		["That's an end?", 2, "thats an end",         "...A true end?", "3/0/0",    "0/13/0", false, false, false]
	];

	// END OF ACHIVEMENTS LIST (DO NOT MODIFY FROM HERE)
	this._achList = [];
	for (var i = 0 ; i < achList.length ; i++) {
		var ca = achList[i];
		var a  = {
			'name':        ca[0],
			'iconIndex':   ca[1],
			'imageFile':   ca[2],
			'description': ca[3],
			'reward':      ca[4],
			'condition':   ca[5],
			'hideName':    ca[6],
			'hideReward':  ca[7],
			'hideDesc':    ca[8]
		};
		this._achList.push(a);
	}
};

MUSH_Achievements.prototype.getAchList = function() {
	return this._achList;
};

MUSH_Achievements.prototype.getAchByName = function(name) {
	var a = null;
	for (var i = 0 ; i < this._achList.length ; i++) {
		if (this._achList[i].name == name) {
			a = this._achList[i];
			break;
		}
	}
	if (a != null) {
		return a;
	} else {
		alert('Error! Inform the developper of achievement error 1001');
	}
};

MUSH_Achievements.prototype.getSceneDetails = function() {
	return this._snDetails;
};

// FROM THIS POINT, MODIFY AT YOUR OWN RISK

//==============================================================================================================
// * SECTION B.01: Achievement Scene
//==============================================================================================================

function Scene_mushMenuAchievementP1(){
    this.initialize.apply(this, arguments);
}

Scene_mushMenuAchievementP1.prototype = Object.create(Scene_MenuBase.prototype);
Scene_mushMenuAchievementP1.prototype.constructor = Scene_mushMenuAchievementP1;

Scene_mushMenuAchievementP1.prototype.initialize = function(){
	this._ach    = new MUSH_Achievements();
	this._action = 0;
	$gameParty.refreshAchievementVariables();
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_mushMenuAchievementP1.prototype.start = function(){
    Scene_MenuBase.prototype.start.call(this);
};

Scene_mushMenuAchievementP1.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this.createWindowGeneral();
};

Scene_mushMenuAchievementP1.prototype.createWindowGeneral = function() {
    this._windowTitle = new Window_mushMenuAchievementTitle_P1(0, 0, Graphics.width, 144, this._ach);
    this._windowCommand = new Window_mushMenuAchievementCommand_P1(0, this._windowTitle.height, Graphics.width, Graphics.height - this._windowTitle.height, this._ach);
    this._windowCommand.setHandler("cancel", this.popScene.bind(this));
    this._windowCommand.setHandler("ok",     this.okInput.bind(this));
    var sd = this._ach.getSceneDetails();
    var whc2h = this._windowCommand.lineHeight() * (sd.heightFactor + 1);
    var wc2h = Graphics.height - this._windowTitle.height - whc2h;
    this._windowCommand2 = new Window_mushMenuAchievementCommand2_P1(0, this._windowTitle.height, Graphics.width, wc2h, this._ach);
    this._windowCommand2.setHandler("cancel", this.popScene.bind(this));
    this._windowCommand2.setHandler("ok",     this.okInput.bind(this));
    this._windowHelpCm2 = new Window_mushMenuAchievementCommand_P1(0, this._windowTitle.height + this._windowCommand2.height, Graphics.width, whc2h, this._ach, true);
    this._windowCommand2.setWindowHelp(this._windowHelpCm2);
    this.addChild(this._windowTitle);
    this.addChild(this._windowCommand);
    this.addChild(this._windowCommand2);
    this.addChild(this._windowHelpCm2);
    if (this._ach.getSceneDetails().defaultSceneView == 1) {
    	this._windowCommand.activate();
	    this._windowCommand.select(0);
	    this._windowHelpCm2.hide();
    } else {
    	this._windowCommand.hide();
    	this._windowCommand2.show();
    	this._windowCommand2.activate();
    	this._windowCommand2.select(0);
    }
};

Scene_mushMenuAchievementP1.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
};

Scene_mushMenuAchievementP1.prototype.okInput = function() {
	if (this._ach.getSceneDetails().sceneToggle) {
    	SoundManager.playOk();
	   	if (this._windowCommand.visible) {
	   		this._windowCommand.hide();
	    	this._windowCommand.deactivate();
	    	this._windowCommand2.show();
	   		this._windowCommand2.activate();
	   		this._windowCommand2.select(this._windowCommand.index());
	   		this._windowHelpCm2.show();
	   	} else {
    		this._windowCommand2.hide();
	    	this._windowCommand2.deactivate();
	   		this._windowHelpCm2.hide();
	    	this._windowCommand.show();
	   		this._windowCommand.activate();
	   		this._windowCommand.select(this._windowCommand2.index());
	   	}
   	}
};

//==============================================================================================================
// * SECTION B.02: Scene Map
//==============================================================================================================

var aliasMush_SceneMapCreate496 = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    aliasMush_SceneMapCreate496.call(this);
    this._dtAch = new MUSH_Achievements();
    this._wPopPeriod = this._dtAch.getSceneDetails().wPopPeriod;
    if (this._wPopPeriod <= 0 && this.achievementSwitchCondition()) {
    	this.verifyAchievementCompletion();
    }
};

Scene_Map.prototype.verifyAchievementCompletion = function() {
	var ach = $gameParty.getAchievementVar();
	var activateP = [];
	for (var i = 0 ; i < ach.length ; i++) {
		var a = ach[i];
		if (a.unlocked == false) {
			var ac = $gameParty.getAchievementCond(a.condition);
			if (ac.type == 0) { // switches
				if ($gameSwitches.value(ac.value1)) {
					activateP.push(i);
				}
			} else if (ac.type == 1) { // variables equal
				if ($gameVariables.value(ac.value1) == ac.value2) {
					activateP.push(i);
				}
			} else if (ac.type == 2) { // variables greater or equal
				if ($gameVariables.value(ac.value1) >= ac.value2) {
					activateP.push(i);
				}
			} else if (ac.type == 3) { // time (number of frames)
				if (Graphics.frameCount >= ac.value1) {
					activateP.push(i);
				}
			} else if (ac.type == 4) { // Party steps
				if ($gameParty.steps() >= ac.value1) {
					activateP.push(i);
				}
			}
		}
	}
	for (var i = 0 ; i < activateP.length ; i++) {
		$gameParty.unlockAchievement(activateP[i]);
		var dt = new MUSH_Achievements();
		$gameParty.giveAchievementReward(dt, activateP[i]);
	}
	if (activateP.length > 0) {
		if (this._dtAch.getSceneDetails().allowPopWindow) {
			this._wAchPop = new Window_mushMenuAchievementPop_P1(0, 0, activateP);
			this._achTimer = 20;
			this._achDone  = false;
		}
	}
};

var aliasMush_SceneMapUpdate238 = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
	aliasMush_SceneMapUpdate238.call(this);
	if (this._achTimer) {
		if (this._dtAch.getSceneDetails().allowPopWindow) {
			if (this._achTimer > 1) {
				this._achTimer -= 1;
			} else {
				if (!this._achDone) {
					this.addWindow(this._wAchPop);
					this._achDone = true;
				}
			}
		}
	}
	if (this._wPopPeriod > 0) {
		if (Graphics.frameCount % this._wPopPeriod == 0 && this.achievementSwitchCondition()) {
			this.verifyAchievementCompletion();
		}
	}
};

Scene_Map.prototype.achievementSwitchCondition = function() {
	var sw = this._dtAch.getSceneDetails().switchForAch;
	if (sw <= 0) {
		return true;
	} else {
		var cond = $gameSwitches.value(sw);
		return cond;
	}
};


//==============================================================================================================
// * SECTION B.03: Scene Menu
//==============================================================================================================

var aliasMush_SceneMenuInitialize23598 = Scene_Menu.prototype.initialize;
Scene_Menu.prototype.initialize = function() {
	this._dtAch = new MUSH_Achievements();
	aliasMush_SceneMenuInitialize23598.call(this);
};

var aliasMush_SceneMenuCreateCommandWindow28 = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	aliasMush_SceneMenuCreateCommandWindow28.call(this);
	var dtAch = this._dtAch.getSceneDetails();
	if (dtAch.addToMenu) {
		var symbol = 'mushAchievements';
		this._commandWindow.setHandler(symbol,    this.commandMushAchievements.bind(this));
	}
};

Scene_Menu.prototype.commandMushAchievements = function() {
	if (this._dtAch.getSceneDetails().switchForAch <= 0) {
		SceneManager.push(Scene_mushMenuAchievementP1);
	} else {
		var sw = this._dtAch.getSceneDetails().switchForAch;
		var cond = $gameSwitches.value(sw);
		if (cond) {
			SceneManager.push(Scene_mushMenuAchievementP1);
		} else {
			SoundManager.playBuzzer();
		}
	}
};


//==============================================================================================================
// * SECTION B.04: Scene Load
//==============================================================================================================

var alias_SceneLoadOnLoadSuccess_135h8 = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
    alias_SceneLoadOnLoadSuccess_135h8.call(this);
    $gameParty.refreshAchievementVariables();
};


//==============================================================================================================
// * SECTION C.01: Window Achievement Title
//==============================================================================================================

function Window_mushMenuAchievementTitle_P1() {
    this.initialize.apply(this, arguments);
}

Window_mushMenuAchievementTitle_P1.prototype = Object.create(Window_Base.prototype);
Window_mushMenuAchievementTitle_P1.prototype.constructor = Window_mushMenuAchievementTitle_P1;

Window_mushMenuAchievementTitle_P1.prototype.initialize = function(x, y, width, height, ach) {
	this._ach = ach;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_mushMenuAchievementTitle_P1.prototype.refresh = function() {
    this.contents.clear();
    var dt = this._ach.getSceneDetails();
    this.contents.fontSize = 32;
    this.drawText(dt.sceneTitle, 0, 0, Graphics.width - 36, 'center');
    this.contents.fontSize = 28;
    this.drawCompletion(Math.floor(this.width / 3 * 2));
    this.drawText(dt.sceneDescription, 0, this.lineHeight(), Graphics.width - 36, 'center');
};

Window_mushMenuAchievementTitle_P1.prototype.drawCompletion = function(barWidth) {
	var dt   = this._ach.getSceneDetails();
	var sx   = Math.floor((this.width - 36 - barWidth) / 2);
	var sy   = this.lineHeight() * 2 + 20;
	var max  = this._ach.getAchList().length;
	var cur  = this.getNumberUnlocked();
	var pour = Math.floor((cur / max) * 100);
	var dWd  = Math.floor((cur / max) * barWidth);
	this.contents.fillRect(sx, sy, barWidth, 12, this.gaugeBackColor());
	this.contents.gradientFillRect(sx, sy, dWd, 12, dt.completionColor1, dt.completionColor2, false);
	this.drawText(dt.textCompletion, sx + 8, this.lineHeight() * 2, barWidth / 2);
	this.drawText("" + pour + "%", sx, this.lineHeight() * 2, barWidth - 8, 'right');
};

Window_mushMenuAchievementTitle_P1.prototype.getNumberUnlocked = function() {
	var num = 0;
	for (var i = 0 ; i < $gameParty.getAchievementVar().length ; i++) {
		var c = $gameParty.getAchievementVar()[i];
		if (c.unlocked == true) {
			num += 1;
		}
	}
	return num;
};

Window_mushMenuAchievementTitle_P1.prototype.drawTextExCenter = function(text, x, y, width) {
	var lines = text.split( "\n", Math.max(this._ach.getSceneDetails().heightFactor - 1, 1) );
	for (var i = 0 ; i < lines.length ; i++) {
		this.drawText(lines[i], x, y + this.lineHeight() * i, width, 'center');
	}
};

//==============================================================================================================
// * SECTION C.02: Window Achievement Command
//==============================================================================================================

function Window_mushMenuAchievementCommand_P1() {
	this.initialize.apply(this, arguments);
};

Window_mushMenuAchievementCommand_P1.prototype = Object.create(Window_Selectable.prototype);
Window_mushMenuAchievementCommand_P1.prototype.constructor = Window_mushMenuAchievementCommand_P1;

Window_mushMenuAchievementCommand_P1.prototype.initialize = function(x, y, width, height, ach, help) {
	this._ach = ach;
	this._sprt = new Sprite_Base();
	this._help = help;
	this._hIndex = -1;
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.addChild(this._sprt);
};

Window_mushMenuAchievementCommand_P1.prototype.maxItems = function() {
	if (this._help) {
		return 1;
	} else {
		return this._ach.getAchList().length;
	}
};

Window_mushMenuAchievementCommand_P1.prototype.itemHeight = function() {
    return this.lineHeight() * this._ach.getSceneDetails().heightFactor;
};

Window_mushMenuAchievementCommand_P1.prototype.refresh = function() {
	for (var i = 0 ; i < this._sprt.children.length ; i++) {
		this._sprt.children[i].renInactive();
	}
	if (this._help == true) {
		// help
	} else {
		Window_Selectable.prototype.refresh.call(this);
	}
};

Window_mushMenuAchievementCommand_P1.prototype.drawItem = function(index, rect) {
	var it   = this._ach.getAchList()[index];
	var paAc = $gameParty.getAchievementVar(it.name);
	var sd   = this._ach.getSceneDetails();
	var fy   = rect.y + Math.floor( (this.itemHeight() - sd.logoSize) / 2 );
	var fx   = rect.x + Math.floor( (this.itemHeight() - sd.logoSize) / 2 );
	var sx   = fx + sd.logoSize + Math.floor( (this.itemHeight() - sd.logoSize) / 2 );
	var wd   = this.width - 36 - sx;
	if (it.imageFile != "" && it.imageFile != undefined && it.imageFile != null) {
		var sprt = new Sprite_ImageLogo_P1(it.imageFile);
		sprt.x = fx + 18;
		sprt.y = fy + 18;
		if (paAc.unlocked == false) {
			if (sd.spriteNotUnlocked != "" && sd.spriteNotUnlocked != undefined && sd.spriteNotUnlocked != null) {
				sprt.bitmap = ImageManager.loadPicture(sd.spriteNotUnlocked);
			} else {
				sprt.setColorTone([-255, -255, -255, 0]);
			}
		}
		this._sprt.addChild(sprt);
	} else {
		if (paAc.unlocked == false) {
			this.drawIconPlusZoom(sd.iconNotUnlocked, fx, fy, sd.logoSize / 32);
		} else {
			this.drawIconPlusZoom(it.iconIndex, fx, fy, sd.logoSize / 32);
		}
	}
	if (paAc.unlocked == false) {
		this.changeColor2(paAc.unlocked, sd);
		if (it.hideName) {
			this.drawText("?????", sx, rect.y, wd);
		} else {
			this.drawText(it.name, sx, rect.y, wd);
		}
		var n = this.changeColor1(paAc.unlocked, sd);
		if (sd.showReward) {
			if (it.hideReward) {
				var name = "?????";
			} else {
				var name = this.getRewardName(it, sd);
			}
			this.drawTextEx("\\c[" + n + "]" + sd.textReward + name, sx, rect.y + this.lineHeight());
			if (it.hideDesc) {
				this.drawTextEx("\\c[" + n + "]" + "????????", sx, rect.y + this.lineHeight() * 2);
			} else {
				this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 2);
			}
		} else {
			if (it.hideDesc) {
				this.drawTextEx("\\c[" + n + "]" + "????????", sx, rect.y + this.lineHeight() * 1);
			} else {
				this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
			}
		}
	} else {
		this.changeColor2(paAc.unlocked, sd);
		this.drawText(it.name, sx, rect.y, wd);
		var n = this.changeColor1(paAc.unlocked, sd);
		if (sd.showReward) {
			var name = this.getRewardName(it, sd);
			this.drawTextEx("\\c[" + n + "]" + sd.textReward + name, sx, rect.y + this.lineHeight());
			this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 2);
		} else {
			this.drawTextEx("\\c[" + n + "]" + it.description, sx, rect.y + this.lineHeight() * 1);
		}
	}
};

Window_mushMenuAchievementCommand_P1.prototype.changeColor1 = function(unlocked, sd) {
	if (unlocked == true) {
		this.changeTextColor(this.resetTextColor());
		return 0;
	} else {
		var n = sd.textColorNotUnlocked;
		this.changeTextColor( this.textColor(n) );
		return n;
	}
};

Window_mushMenuAchievementCommand_P1.prototype.changeColor2 = function(unlocked, sd) {
	if (unlocked == true) {
		this.changeTextColor(this.systemColor());
	} else {
		var n = sd.textColorNotUnlocked;
		this.changeTextColor( this.textColor(n) );
	}
};

Window_mushMenuAchievementCommand_P1.prototype.drawIconPlusZoom = function(iconIndex, x, y, zoom) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var zoomValue = pw * zoom;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
};

Window_mushMenuAchievementCommand_P1.prototype.getRewardName = function(it, sd) {
	var s = $gameParty.getAchievementReward(it.reward);
	if (s.category < 3 && s.category >= 0) {
		if (s.category == 0) var dt = $dataItems;
		if (s.category == 1) var dt = $dataArmors;
		if (s.category == 2) var dt = $dataWeapons;
		var r = dt[s.index];
		var text = "" + r.name + "\\i[" + r.iconIndex + "]" + " x" + s.amount;
		return text;
	} else if (s.category == 3) {
		var text = "" + s.amount + "\G";
		return text;
	} else {
		return sd.textNoReward;
	}
};

Window_mushMenuAchievementCommand_P1.prototype.drawAllItems = function() {
    var topIndex = this.topIndex();
    for (var i = 0; i < this.maxPageItems(); i++) {
        var index = topIndex + i;
        if (index < this.maxItems()) {
        	var rect = this.itemRectForText(index);
            this.drawItem(index, rect);
        }
    }
};

Window_mushMenuAchievementCommand_P1.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	for (var i = 0 ; i < this._sprt.children.length ; i++) {
		if (this._sprt.children[i].getRepos() == false) {
			if (this._sprt.children[i].width && this._sprt.children[i].height) {
				var scaleX = this._ach.getSceneDetails().logoSize / this._sprt.children[i].width;
				var scaleY = this._ach.getSceneDetails().logoSize / this._sprt.children[i].height;
				this._sprt.children[i].setCorrection(scaleX, scaleY);
			}
		}
	};
};

Window_mushMenuAchievementCommand_P1.prototype.updateHelp = function(index) {
	if (this._hIndex != index) {
		this._hIndex = index;
		if (this._hIndex >= 0 && this._hIndex <= this._ach.getAchList().length - 1) {
			this.contents.clear();
			for (var i = 0 ; i < this._sprt.children.length ; i++) {
				this._sprt.children[i].renInactive();
			}
			var rect = this.itemRectForText(0);
			this.drawItem(this._hIndex, rect);
		} else {
			this.contents.clear();
			for (var i = 0 ; i < this._sprt.children.length ; i++) {
				this._sprt.children[i].renInactive();
			}
		}
	}
};

//==============================================================================================================
// * SECTION C.03: Window Achievement Pop
//==============================================================================================================

function Window_mushMenuAchievementPop_P1() {
    this.initialize.apply(this, arguments);
}

Window_mushMenuAchievementPop_P1.prototype = Object.create(Window_Base.prototype);
Window_mushMenuAchievementPop_P1.prototype.constructor = Window_mushMenuAchievementPop_P1;

Window_mushMenuAchievementPop_P1.prototype.initialize = function(x, y, achs) {
	this._dt      = new MUSH_Achievements();
	this._achs    = achs;
    Window_Base.prototype.initialize.call(this, x, y, Graphics.width, 216);
    this._aUpdate = true;
	this._timer   = 450;
	this._pos     = 0;
    this.opacity  = 0;
	this.contentsOpacity = 0;
    this.refresh();
};

Window_mushMenuAchievementPop_P1.prototype.refresh = function() {
    this.contents.clear();
    var tx = this._dt.getSceneDetails().textPop;
    var wd = this._dt.getSceneDetails().wPopWidth;
    var color1 = this._dt.getSceneDetails().wPopColor1;
    var color2 = this._dt.getSceneDetails().wPopColor2;
    this.contents.gradientFillRect(0, 0, wd, this._achs.length / 2 * this.lineHeight(), color1, color2, true);
    this.contents.gradientFillRect(0, this._achs.length / 2 * this.lineHeight(), wd, this._achs.length / 2 * this.lineHeight(), color2, color1, true);
    for (var i = 0 ; i < this._achs.length ; i++) {
    	var c    = this._achs[i];
    	var name = $gameParty.getAchievementVar()[c].name;
    	var icon = this._dt.getAchByName(name).iconIndex;
    	var text = tx + "\\c[16]" + name + " " + "\\i[" + icon + "]";
    	this.drawTextEx(text, 8, this.lineHeight() * i);
    }
};

Window_mushMenuAchievementPop_P1.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (this._aUpdate) {
		if (this._timer > 0) {
			this._timer -= 1;
			if (this.contentsOpacity < 255) {
				this.contentsOpacity += 3;
			}
		} else {
			if (this.contentsOpacity > 0) {
				this.contentsOpacity -= 3;
			} else {
				this._aUpdate = false;
				this.hide();
			}
		}
		if ($gameMessage.isBusy()) {
			var corPos = 0;
			var pt = $gameMessage.positionType();
			if ($gameMessage.hasText()) {
				if (pt == 0) {
					corPos = 1;
				}
			}
			if (this._pos != corPos) {
				this._pos = corPos + 0;
				this.replaceWindowY();
			}
		} else {
			if (this._pos != 0) {
				this._pos = 0;
				this.replaceWindowY();
			}
		}
	}
};

Window_mushMenuAchievementPop_P1.prototype.endProcess = function() {
	this._aUpdate = false;
	this._timer = 0;
	this.hide();
};

Window_mushMenuAchievementPop_P1.prototype.replaceWindowY = function() {
	if (this._pos == 0) {
		this.y = 0;
	} else if (this._pos == 1) {
		this.y = Graphics.height - this.height;
	}
};

//==============================================================================================================
// * SECTION C.04: Window Achievement Command 2
//==============================================================================================================

function Window_mushMenuAchievementCommand2_P1() {
	this.initialize.apply(this, arguments);
};

Window_mushMenuAchievementCommand2_P1.prototype = Object.create(Window_Selectable.prototype);
Window_mushMenuAchievementCommand2_P1.prototype.constructor = Window_mushMenuAchievementCommand2_P1;

Window_mushMenuAchievementCommand2_P1.prototype.initialize = function(x, y, width, height, ach) {
	this._ach = ach;
	this._sprt = new Sprite_Base();
	Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.hide();
	this.deactivate();
	this.refresh();
	this.addChild(this._sprt);
};

Window_mushMenuAchievementCommand2_P1.prototype.maxItems = function() {
    return this._ach.getAchList().length;
};

Window_mushMenuAchievementCommand2_P1.prototype.itemHeight = function() {
    return this._ach.getSceneDetails().logoSize + this.spacing();
};

Window_mushMenuAchievementCommand2_P1.prototype.itemWidth = function() {
    return this._ach.getSceneDetails().logoSize + this.spacing();
};

Window_mushMenuAchievementCommand2_P1.prototype.maxCols = function() {
	var cols = Math.floor( (this.width - 36) / (this.itemWidth() + this.spacing()) );
    return cols;
};

Window_mushMenuAchievementCommand2_P1.prototype.refresh = function() {
	for (var i = 0 ; i < this._sprt.children.length ; i++) {
		this._sprt.children[i].renInactive();
	}
	Window_Selectable.prototype.refresh.call(this);
};

Window_mushMenuAchievementCommand2_P1.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	for (var i = 0 ; i < this._sprt.children.length ; i++) {
		if (this._sprt.children[i].getRepos() == false) {
			if (this._sprt.children[i].width && this._sprt.children[i].height) {
				var scaleX = this._ach.getSceneDetails().logoSize / this._sprt.children[i].width;
				var scaleY = this._ach.getSceneDetails().logoSize / this._sprt.children[i].height;
				this._sprt.children[i].setCorrection(scaleX, scaleY);
			}
		}
	};
	if (this._windowHelp) {
		this._windowHelp.updateHelp(this.index());
	}
};

Window_mushMenuAchievementCommand2_P1.prototype.setWindowHelp = function(windowHelp) {
	this._windowHelp = windowHelp;
};

Window_mushMenuAchievementCommand2_P1.prototype.drawItem = function(index) {
	var rect = this.itemRectForText(index);
	var it   = this._ach.getAchList()[index];
	var paAc = $gameParty.getAchievementVar(it.name);
	var sd   = this._ach.getSceneDetails();
	var fy   = rect.y + this.spacing() / 2;
	var fx   = rect.x + this.spacing() / 2;
	if (it.imageFile != "" && it.imageFile != undefined && it.imageFile != null) {
		var sprt = new Sprite_ImageLogo_P1(it.imageFile);
		sprt.x = fx + 18;
		sprt.y = fy + 18;
		if (paAc.unlocked == false) {
			if (sd.spriteNotUnlocked != "" && sd.spriteNotUnlocked != undefined && sd.spriteNotUnlocked != null) {
				sprt.bitmap = ImageManager.loadPicture(sd.spriteNotUnlocked);
			} else {
				sprt.setColorTone([-255, -255, -255, 0]);
			}
		}
		this._sprt.addChild(sprt);
	} else {
		if (paAc.unlocked == false) {
			this.drawIconPlusZoom(sd.iconNotUnlocked, fx, fy, sd.logoSize / 32);
		} else {
			this.drawIconPlusZoom(it.iconIndex, fx, fy, sd.logoSize / 32);
		}
	}
};

Window_mushMenuAchievementCommand2_P1.prototype.drawIconPlusZoom = function(iconIndex, x, y, zoom) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var zoomValue = pw * zoom;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
};

Window_mushMenuAchievementCommand2_P1.prototype.itemRectForText = function(index) {
    var rect = this.itemRect(index);
    return rect;
};


//==============================================================================================================
// * SECTION C.05: Window Menu Command
//==============================================================================================================

var aliasMush_WindowMenuCommandMakeCommandList59 = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
    aliasMush_WindowMenuCommandMakeCommandList59.call(this);
    var dtAch = new MUSH_Achievements().getSceneDetails();
    if (dtAch.addToMenu) this.addAchievementCommand(dtAch);
};

Window_MenuCommand.prototype.addAchievementCommand = function(dtAch) {
	if (this.needsCommand(dtAch.sceneTitle)) {
		if (dtAch.switchForAch <= 0) {
			var enabled = true;
			var name = dtAch.sceneTitle;
		} else {
			var sw = dtAch.switchForAch;
			var enabled = $gameSwitches.value(sw);
			if (enabled) {
				var name = dtAch.sceneTitle;
			} else {
				var name = "?????";
			}
		}
        this.addCommand(name, 'mushAchievements', enabled);
        this.repositionAchievements();
    }
};

Window_MenuCommand.prototype.repositionAchievements = function() {
	var itemCollector = null;
	for (var i = 0; i < this._list.length; i++) {
		if (this._list[i].symbol == 'mushAchievements') {
			itemCollector = this._list[i];
			this._list.splice(i, 1);
			break;
		}
	}
	for (var i = 0; i < this._list.length; i++) {
		if (this._list[i].symbol == 'options') {
			if (itemCollector != null) {
				this._list.splice(i, 0, itemCollector);
				break;
			} 
		}
	}
};


//==============================================================================================================
// * SECTION D.01: Sprite Image Logo
//==============================================================================================================

function Sprite_ImageLogo_P1() {
	this.initialize.apply(this, arguments);
};

Sprite_ImageLogo_P1.prototype = Object.create(Sprite_Base.prototype);
Sprite_ImageLogo_P1.prototype.constructor = Sprite_ImageLogo_P1;

Sprite_ImageLogo_P1.prototype.initialize = function(bitmap, ach) {
	this._ach = ach;
	Sprite_Base.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadPicture(bitmap, 0);
	this._repos = false;
};

Sprite_ImageLogo_P1.prototype.getRepos = function() {
	return this._repos;
};

Sprite_ImageLogo_P1.prototype.renInactive = function() {
	this.hide();
	this._repos = true;
};

Sprite_ImageLogo_P1.prototype.setCorrection = function(scaleX, scaleY) {
	this.scale.x = scaleX;
	this.scale.y = scaleY;
	this._repos  = true;
};

//==============================================================================================================
// * SECTION E.01: Game Party
//==============================================================================================================

var aliasMush_GamePartyInitialize25698 = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    aliasMush_GamePartyInitialize25698.call(this);
    this.createAchievementVariables();
};

Game_Party.prototype.createAchievementVariables = function() {
	if (this._achVr) {
		// do nothing
	} else {
		this._achVr = [];
		var d = new MUSH_Achievements().getAchList();
		for (var i = 0 ; i < d.length ; i++) {
			this.addAchievementVariable(d[i].name, d[i].condition);
		}
	}
};

Game_Party.prototype.refreshAchievementVariables = function() {
	this.createAchievementVariables();
	var d = new MUSH_Achievements().getAchList();
	for (var i = 0 ; i < d.length ; i++) {
		var c = this.getAchievementVar(d[i].name);
		if (c == null || c == undefined) {
			this.addAchievementVariable(d[i].name, d[i].condition);
		} else {
			if (c.condition != d[i].condition) {
				this.modifyAchievementVar(c.name, d[i].condition, false);
			}
		}
	}
};

Game_Party.prototype.addAchievementVariable = function(name, condition) {
	var dd = {'name': name, 'condition': condition, 'unlocked': false};
	this._achVr.push(dd);
};

Game_Party.prototype.modifyAchievementVar = function(name, newCond, reset) {
	for (var i = 0 ; i < this._achVr.length ; i++) {
		if (this._achVr[i].name == name) {
			this._achVr[i].condition = newCond;
			if (reset == true) {
				this._achVr[i].unlocked = false;
			}
			break;
		}
	}
};

Game_Party.prototype.getAchievementVar = function(name) {
	if (name) {
		var a = null;
		for (var i = 0 ; i < this._achVr.length ; i++) {
			if (this._achVr[i].name == name) {
				a = this._achVr[i];
				break;
			}
		}
		return a;
	} else {
		return this._achVr;
	}
};

Game_Party.prototype.unlockAchievement = function(index) {
	this._achVr[index].unlocked = true;
};

Game_Party.prototype.giveAchievementReward = function(dt, index) {
	var a  = this._achVr[index];
	var ad = dt.getAchByName(a.name);
	var rw = this.getAchievementReward(ad.reward);
	if (rw.category == 0) {
		var it = $dataItems[rw.index];
		this.gainItem(it, rw.amount, false);
	} else if (rw.category == 1) {
		var it = $dataArmors[rw.index];
		this.gainItem(it, rw.amount, false);
	} else if (rw.category == 2) {
		var it = $dataWeapons[rw.index];
		this.gainItem(it, rw.amount, false);
	} else if (rw.category == 3) {
		this.gainGold(rw.amount);
	}
};

Game_Party.prototype.getAchievementReward = function(rwd) {
	var sts = rwd.split("/");
	if (sts.length < 3) {
		alert("Check your '/' in the achievements list's reward parts.");
		return "error!";
	} else {
		var s = {'category': Number(sts[0]), 'index': Number(sts[1]), 'amount': Number(sts[2])};
		return s;
	}
};

Game_Party.prototype.getAchievementCond = function(cdn) {
	var sts = cdn.split("/");
	if (sts.length < 3) {
		alert("Check your '/' in the achievements list's condition parts.");
		return "error!";
	} else {
		var s = {'type': Number(sts[0]), 'value1': Number(sts[1]), 'value2': Number(sts[2])};
		return s;
	}
};
