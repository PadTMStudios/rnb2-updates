//==============================================================================================================
//--------------------------------------------------------------------------------------------------------------
// *** MUSHROOMCAKE28'S  MENU ITEM COLLECTOR
//  * Author: MushroomCake28
//  * Contact: last.truong@hotmail.com
//  * Version: 1.04 (2017-07-11) 
//  * File Name: $MUSH_MenuItemCollector_P1.js
//--------------------------------------------------------------------------------------------------------------
// * INFO :  This script creates a new menu for the item collector scene. It can be accessed from menu if you
//           decide so (in the parameters) and will offer the possibility to keep track of how many items 
//           where collected and how many chests aren't opened yet.
// * TERMS : This script is part of the MushroomCake Public first generation scripts. It can be used by anyone
//           for free and commercials games without requesting my permission. You just need to credit me
//           (MushroomCake28), and please be generous if I request a copy of your game ;) 
// * USAGE : Save as a javascript file (.js at the end) if it's not already a js file and insert it anywhere
//           in the plugin manager. Use the file name at the top of the script. 
//--------------------------------------------------------------------------------------------------------------
// INFORMATION ON FUNCTIONALITY
// * This script will be referred as 'MIT' in the code.
// * Plugin Commands:
//   - ItemCollector open
//   - ItemCollector remove [type] [id]
//   - ItemCollector add [type] [id]
//--------------------------------------------------------------------------------------------------------------
// UPDATES HISTORY
// * v.1.01: finished (2017-05-01)
// * v.1.02: finished (2017-05-10)
//   - added compatibility with YEP Item Core
//   - added auto updater (no need to hard reset anymore)
// * v.1.03: finished (2017-07-11)
//   - added plugin command for conditions
// * v.1.04: finished (????)
//   - added some YEP features (image and stuff)
// * v.1.05: finished (2019/06/16)
//   - Fixed a bug where YEP images would still display on locked items.
//   - Fixed a bug where the YEP images zoom process would be displayed on screen.
//--------------------------------------------------------------------------------------------------------------
// SECTIONS
// * Section 1: Scenes
//   - 1.0 : Scene Menu (adding the command)
//   - 1.1 : Scene Menu ItemCollector
// * Section 2: Windows
//   - 2.0 : Window MenuCommand
//   - 2.1 : Window Collector Command
//   - 2.2 : Window Collector Sections 
//   - 2.3 : Window Collector Info
//   - 2.4 : Window Collector Plus
// * Section 3: Game Objects
//   - 3.0 : Game Party
//   - 3.1 : Game Interpreter
//==============================================================================================================
// *** PLUGIN PARAMETERS
/*:
*
* @plugindesc [v.1.05] Creates a Menu Item Collector
* @author MushroomCake28
* @help 
*
* MushroomCake28's ItemCollector plugin [v.1.05]
*
* This plugins creates an item collector menu scene that can be accessible from 
* the menu. Just install the plugin for it to work. You can restrict the scene's
* accessibility with a Game Switch of your choice (indicate the switch Id in the
* parameters, set to 0 if you don't want to restrict the scene at all).
*
* You can use plugin commands for additional stuffs:
* - ItemCollector open : opens the scene ItemCollector
* - ItemCollector add [type] [id] : make it so a particular item is considered 
*   seen by the game. Set the type to 'items', 'weapons' or 'armors' (without the
*   apostrophes) for the object category and set the id.
*   example: ItemCollector add items 2  ** This will add the item with the Id 2.
* - ItemCollector remove [type] [id] : make it so a particular item is considered not 
*   seen by the game. Same arguments as the the add command.
* - ItemCollector getCompletion [category] [variable id]: (Only in v.1.03 and up).
*   Get the completion of the item collector. It will return a value between 0 and
*   100, 100 being completed 100%. The value will be stored in a defined variable.
*   Example: ItemColelctor getCompletion armors 5 ** this will store the completion
*   of the armors section in the game variable 5. 
*   Note: possible categories are: all, items, armors, weapons. (you must write them
*   exactly like that, or else it won't work).
*
*   More information on that plugin command at this link:
*   https://www.youtube.com/watch?v=I43rCV8HdTk&feature=youtu.be 
*
* If you don't want the game to display the chest completion (because for example
* you don't want to count 200+ chests in your game), set the 'Chest Total' 
* parameter to 0, or set the 'Chest Variable' to 0.
*
* When still in the game making process, you might sometimes modify the items in
* the database or change excluded items from the item collector list. If you turn
* the 'Auto Update' parameter ON (set it to true), it will automatically update
* the saved item collector list in game. If only minor changes have been made 
* (only changed excluded items), it will simply update the list while keeping the
* saved items. Bigger changes will result in a item collector list wipe and will
* create a new list. You can still Hard reset as you please.
*
* For the 'Hard Reset' parameter, it is a parameter designed for the game builder
* and testing. Set it to false before publishing your game. The parameter resets 
* the Item Collector saves in game. Since the Item Collector Data is initialized
* when starting a game, it is impossible to change data such as adding/removing
* items or equips from the database and adding/removing excluded items or equips.
* If you still want to continue testing without having to do a new game, follow
* these steps:
* 1) Set the parameter 'Hard Reset' to true and save.
* 2) Start the game and load your save file.
* 3) Enter the ItemCollector scene. Everything should have been reset.
* 4) Exit the menu and save. Then Quit the game.
* 5) Set the parameter 'Hard Reset' to false and save.
*
* UPDATE 1.04:
*
* Added some compatibility features for Yanfly's Item Picture Image plugin. The
* item's image (from the picture folder) can now be displayed in the Item
* Collector. Check the Yanfly Seciton in this plugins' parameters to decide
* wether or not to scale the image to fit the Item Collector's window perfectly.
*
* Added some compatibility features for Yanfly's Equip Core plugin. The equip's
* stats from the lunatic mode can now be displayed in the item collector. Check 
* the Yanfly section in this plugin's parameters to decide wether or not to show
* these stats in the Item Collector.
*
* For more information, visit my website or my youtube channel. I explain how the
* to use the plugin properly on youtube.
*
* UPDATE 1.05:
*
* Fixed the bug where the YEP image didn't disappear when moving the cursor from
* an item using a YEP image to a locked item. 
*
* Fixed the bug where the YEP image zoom process was displayed on screen. From
* now on, the image will appear after its zoom is set.
*
* youtube: https://www.youtube.com/watch?v=5WdgXBhhf6A
* website: https://www.kamostudiogroup.com/
* forum thread: https://forums.rpgmakerweb.com/index.php?threads/mush-plugins-item-collector-menu.78248/
*
* @param ---------------------
* @desc 
* @default
*
* @param * TESTING
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param Auto Update
* @desc See the plugin's help section for this parameter.
* @default true
*
* @param Hard Reset
* @desc See the plugin's help section for this parameter.
* @default false
*
* @param ---------------------
* @desc 
* @default
*
* @param * GENERAL
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param In Menu
* @desc Set the command to true if you want to add a command to access the item collector from the menu.
* @default true
*
* @param Item Collector Switch
* @desc Set the switch. When off, the item collector won't be available. 0 or nothing = no switch.
* @default 0
*
* @param Menu Command
* @desc Set command that will appear in the menu
* @default Item Collector
*
* @param Excluded Items
* @desc Set the index of all the items that will be excluded from the item collector. Syntax: [item1, item2, etc.]
* @default []
*
* @param Excluded Weapons
* @desc Set the index of all the weapons that will be excluded from the item collector. Syntax: [item1, item2, etc.]
* @default []
*
* @param Excluded Armors
* @desc Set the index of all the armors that will be excluded from the item collector. Syntax: [item1, item2, etc.]
* @default []
*
* @param Chest Variable
* @desc Set the variable that will count chest openings. 0 or nothing will not keep track of chests.
* @default 0
*
* @param Chest Total
* @desc The number of chests in the game. 0 will not keep track of chests.
* @default 0
*
* @param ---------------------
* @desc 
* @default
*
* @param * SECTIONS
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param Section Includes
* @desc [regular, key, hidden a, hidden b, weapon, armor]. Set to true if you want the section.
* @default [true, true, true, true, true, true]
*
* @param Section All
* @desc Set the section name for 'all items'
* @default All
*
* @param Section Regular Item
* @desc Set the section name for 'regular items'
* @default Consumables
*
* @param Section Key Item
* @desc Set the section name for 'key items'
* @default Key Items
*
* @param Section Hidden Item A
* @desc Set the section name for 'hidden items A'
* @default Hidden A
*
* @param Section Hidden Item B
* @desc Set the section name for 'hidden items B'
* @default Hidden B
*
* @param Section Weapon
* @desc Set the section name for 'weapons'
* @default Weapons
*
* @param Section Armor
* @desc Set the section name for 'armors'
* @default Armors
*
* @param ---------------------
* @desc 
* @default
*
* @param * INFO WINDOW 
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param Text Id
* @desc Set the text for the item's Id.
* @default Id
*
* @param Text Own
* @desc Set the text for the number of times the party owns the item.
* @default Own
*
* @param Text Price
* @desc Set the text for the item's price.
* @default Price
*
* @param Text Type
* @desc Set the text for the item's type.
* @default Type
*
* @param Text Hp Recover +
* @desc Set the text for the Hp recovery + part.
* @default Hp heal +
*
* @param Text Hp Recover %
* @desc Set the text for the Hp recovery % part.
* @default Hp heal %
*
* @param Text Mp Recover +
* @desc Set the text for the Mp recovery + part.
* @default Mp heal +
*
* @param Text Mp Recover %
* @desc Set the text for the Mp recovery % part.
* @default Mp heal %
*
* @param Text Tp Gain
* @desc Set the text for the Tp gain part.
* @default Tp gain
*
* @param Text Add State
* @desc Set the text for the Add state part.
* @default Add states
*
* @param Text Remove State
* @desc Set the text for the Add state part.
* @default Remove states
*
* @param ---------------------
* @desc 
* @default
*
* @param * COMPLETION WINDOW
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param Text Completion
* @desc Set the text for the completion part.
* @default Completion
*
* @param Text Chest
* @desc Set the text for the chest part.
* @default Chest
*
* @param Chest Bar Color 1
* @desc Set the color 1 for the bar in the chest completion part.
* @default 'rgba(0, 128, 128, 1)'
*
* @param Chest Bar Color 2
* @desc Set the color 2 for the bar in the chest completion part.
* @default 'rgba(128, 0, 128, 1)'
*
* @param Section Bar Color 1
* @desc Set the color 1 for the bar in the section completion part.
* @default 'rgba(0, 128, 128, 1)'
*
* @param Section Bar Color 2
* @desc Set the color 2 for the bar in the section completion part.
* @default 'rgba(128, 0, 128, 1)'
*
* @param ---------------------
* @desc 
* @default
*
* @param * PARAMETERS AND ELEMENTS
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param Parameters Icons
* @desc Set the icon for the parameters. Set to -1 if you don't want icons. 
* Syntax: [hp, mp, atk, def, mat, mdf, agi, luk]
* @default [32, 33, 34, 35, 36, 37, 38, 39]
*
* @param Parameters Text
* @desc Set the text for each parameters. Syntax: [hp, mp, atk, def, mat, mdf, agi, luk]
* @default ["Mhp", "Mmp", "Atk", "Def", "Mat", "Mdf", "Agi", "Luk"]
*
* @param Parameters Back Color
* @desc Set the color for the parameter background. 
* Syntax: rgba(red, green, blue, alpha)
* @default rgba(48, 48, 48, 0.9)
*
* @param Element Icons
* @desc Set the icon for the elements. Set to -1 if you don't want icons. 
* Syntax: [element 1, element 2, etc.]
* @default [77, 64, 65, 66, 67, 68, 69, 70, 71]
*
* @param Element Weak Text
* @desc Set the text for the element weak info.
* @default Elemental weakness
*
* @param Element Resist Text
* @desc Set the text for the element resist info.
* @default Elemental resist
*
* @param Parameters Bar
* @desc Set to true if you want some bars for each parameters.
* @default true
*
* @param Parameters BarColor MHP
* @desc Set the color for the mhp bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor MMP
* @desc Set the color for the mmp bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor ATK
* @desc Set the color for the atk bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor DEF
* @desc Set the color for the def bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor MAT
* @desc Set the color for the mat bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor MDF
* @desc Set the color for the mdf bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor AGI
* @desc Set the color for the agi bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param Parameters BarColor LUK
* @desc Set the color for the luk bar.
* Syntax: 'rgba(red, green, blue, alpha)'
* @default 'rgba(0, 255, 128, 1)'
*
* @param ---------------------
* @desc 
* @default
*
* @param * YANFLY SECTION
* @desc 
* @default
*
* @param ---------------------
* @desc 
* @default
*
* @param YEP Equip Core Lunatic Factor
* @desc If true, and if the YEP_EquipCore plugin is present, it take the lunatic mode stat into account.
* @default true
*
* @param YEP Item Picture Scale
* @desc If true, and if the YEP_ItemPictureImg plugin is present, it will scale the picture to 128x128 to fit perfectly.
* @default true
*
*/
//==============================================================================================================


var Imported = Imported || {};
Imported.mushFeatures = Imported.mushFeatures || {}; 
Imported.mushFeatures['MenuItemCollector_P1'] = 1.02;


var $mushFeatures = $mushFeatures || { 'imported': {}, 'params': {} };
$mushFeatures.imported['MenuItemCollector_P1'] = 1.02;


var nowParameters = PluginManager.parameters('$MUSH_MenuItemCollector_P1');


$mushFeatures.params['MIT_AutoUpdate']       = eval(nowParameters['Auto Update']);
$mushFeatures.params['MIT_HardReset']        = eval(nowParameters['Hard Reset']);


$mushFeatures.params['MIT_InMenu']           = eval(nowParameters['In Menu']);
$mushFeatures.params['MIT_Switch']           = Number(nowParameters['Item Collector Switch']);
$mushFeatures.params['MIT_MenuCommand']      = String(nowParameters['Menu Command']);
$mushFeatures.params['MIT_ExcludedItems']    = eval(nowParameters['Excluded Items']);
$mushFeatures.params['MIT_ExcludedWeapons']  = eval(nowParameters['Excluded Weapons']);
$mushFeatures.params['MIT_ExcludedArmors']   = eval(nowParameters['Excluded Armors']);
$mushFeatures.params['MIT_ChestVariable']    = Number(nowParameters['Chest Variable']);
$mushFeatures.params['MIT_ChestTotal']       = Number(nowParameters['Chest Total']);


$mushFeatures.params['MIT_SectionIncludes']  = eval(nowParameters['Section Includes']);
$mushFeatures.params['MIT_SectionAll']       = String(nowParameters['Section All']);
$mushFeatures.params['MIT_SectionRegular']   = String(nowParameters['Section Regular Item']);
$mushFeatures.params['MIT_SectionKey']       = String(nowParameters['Section Key Item']);
$mushFeatures.params['MIT_SectionHiddenA']   = String(nowParameters['Section Hidden Item A']);
$mushFeatures.params['MIT_SectionHiddenB']   = String(nowParameters['Section Hidden Item B']);
$mushFeatures.params['MIT_SectionWeapon']    = String(nowParameters['Section Weapon']);
$mushFeatures.params['MIT_SectionArmor']     = String(nowParameters['Section Armor']);


$mushFeatures.params['MIT_TextId']           = String(nowParameters['Text Id']);
$mushFeatures.params['MIT_TextOwn']          = String(nowParameters['Text Own']);
$mushFeatures.params['MIT_TextPrice']        = String(nowParameters['Text Price']);
$mushFeatures.params['MIT_TextType']         = String(nowParameters['Text Type']);
$mushFeatures.params['MIT_TextHpRecover+']   = String(nowParameters['Text Hp Recover +']);
$mushFeatures.params['MIT_TextHpRecover%']   = String(nowParameters['Text Hp Recover %']);
$mushFeatures.params['MIT_TextMpRecover+']   = String(nowParameters['Text Mp Recover +']);
$mushFeatures.params['MIT_TextMpRecover%']   = String(nowParameters['Text Mp Recover %']);
$mushFeatures.params['MIT_TextTpGain']       = String(nowParameters['Text Tp Gain']);
$mushFeatures.params['MIT_TextAddState']     = String(nowParameters['Text Add State']);
$mushFeatures.params['MIT_TextRemoveState']  = String(nowParameters['Text Remove State']);


$mushFeatures.params['MIT_TextCompletion']   = String(nowParameters['Text Completion']);
$mushFeatures.params['MIT_TextChest']        = String(nowParameters['Text Chest']);
$mushFeatures.params['MIT_ChestBarColor1']   = eval(nowParameters['Chest Bar Color 1']);
$mushFeatures.params['MIT_ChestBarColor2']   = eval(nowParameters['Chest Bar Color 2']);
$mushFeatures.params['MIT_SectionBarColor1'] = eval(nowParameters['Section Bar Color 1']);
$mushFeatures.params['MIT_SectionBarColor2'] = eval(nowParameters['Section Bar Color 2']);


$mushFeatures.params['MIT_ParametersIcons']       = eval(nowParameters['Parameters Icons']);
$mushFeatures.params['MIT_ParametersText']        = eval(nowParameters['Parameters Text']);
$mushFeatures.params['MIT_ParametersBackColor']   = String(nowParameters['Parameters Back Color']);
$mushFeatures.params['MIT_ElementIcons']          = eval(nowParameters['Element Icons']);
$mushFeatures.params['MIT_ElementWeakText']       = String(nowParameters['Element Weak Text']);
$mushFeatures.params['MIT_ElementResistText']     = String(nowParameters['Element Resist Text']);
$mushFeatures.params['MIT_ParametersBar']         = eval(nowParameters['Parameters Bar']);
$mushFeatures.params['MIT_ParametersBarColorMHP'] = eval(nowParameters['Parameters BarColor MHP']);
$mushFeatures.params['MIT_ParametersBarColorMMP'] = eval(nowParameters['Parameters BarColor MMP']);
$mushFeatures.params['MIT_ParametersBarColorATK'] = eval(nowParameters['Parameters BarColor ATK']);
$mushFeatures.params['MIT_ParametersBarColorDEF'] = eval(nowParameters['Parameters BarColor DEF']);
$mushFeatures.params['MIT_ParametersBarColorMAT'] = eval(nowParameters['Parameters BarColor MAT']);
$mushFeatures.params['MIT_ParametersBarColorMDF'] = eval(nowParameters['Parameters BarColor MDF']);
$mushFeatures.params['MIT_ParametersBarColorAGI'] = eval(nowParameters['Parameters BarColor AGI']);
$mushFeatures.params['MIT_ParametersBarColorLUK'] = eval(nowParameters['Parameters BarColor LUK']);


$mushFeatures.params['MIT_YEP_EquipCoreLunaticFactor'] = eval(nowParameters['YEP Equip Core Lunatic Factor']);
$mushFeatures.params['MIT_YEP_ItemPictureScale']       = eval(nowParameters['YEP Item Picture Scale']);


//==============================================================================================================
// * SECTION 1.0 : Scene Menu 
//   - Adding the command
//==============================================================================================================


var aliasMush_SceneMenuCreateCommandWindow26 = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	aliasMush_SceneMenuCreateCommandWindow26.call(this);
	if ($mushFeatures.params['MIT_InMenu']) {
		var itemCollector = 'itemCollector';
		this._commandWindow.setHandler(itemCollector,    this.commandMushItemCollector.bind(this));
	}
};


Scene_Menu.prototype.commandMushItemCollector = function() {
	SceneManager.push(Scene_MenuItemCollector);
};


//==============================================================================================================
// * SECTION 1.1 : Scene Menu Item Collector
//   - Create the scene
//==============================================================================================================


function Scene_MenuItemCollector() {
    this.initialize.apply(this, arguments);
}


Scene_MenuItemCollector.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MenuItemCollector.prototype.constructor = Scene_MenuItemCollector;


Scene_MenuItemCollector.prototype.initialize = function() {
	$gameParty.checkInitializedItemCollector();
	$gameParty.hardReset_ItemCollectorList();
    Scene_MenuBase.prototype.initialize.call(this);
    this.setStartingProperties();
};


Scene_MenuItemCollector.prototype.setStartingProperties = function() {
	this._action = 0;
};


Scene_MenuItemCollector.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAllWindows();
};


Scene_MenuItemCollector.prototype.createAllWindows = function() {
	this._windowSections = new Window_ItemCollectorSections(0, 0, Graphics._boxWidth / 2, 144);
	this._windowHelp     = new Window_Help(2);
	this._windowHelp.y   = Graphics._boxHeight - 108;
	this._windowCommand  = new Window_ItemCollectorCommand(0, this._windowSections.height, Graphics._boxWidth / 3, 
				Graphics._boxHeight - this._windowHelp.height - this._windowSections.height);
	this._windowCommand.setWindowHelp(this._windowHelp);
	this._windowInfo     = new Window_ItemCollectorInfo(this._windowCommand.width, this._windowSections.height, Graphics._boxWidth / 3 * 2, 
				this._windowCommand.height);
	this._windowPlus     = new Window_ItemCollectorPlus(this._windowSections.width, 0, Graphics._boxWidth / 2, this._windowSections.height);
	this.addChild(this._windowSections);
	this.addChild(this._windowHelp);
	this.addChild(this._windowCommand);
	this.addChild(this._windowInfo);
	this.addChild(this._windowPlus);
};


Scene_MenuItemCollector.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	this.updateMushInputs();
	this.updateSection();
	this.updateItem();
	this.updatePlus();
};


Scene_MenuItemCollector.prototype.updateSection = function() {
	if (this._action == 0) {
		this._windowCommand.setSection(this._windowSections.getSymbol());
		this._windowPlus.setSection(this._windowSections.getSymbol());
	}
};


Scene_MenuItemCollector.prototype.updateItem = function() {
	if (this._windowCommand.index() >= 0) {
		this._windowInfo.setItem(this._windowCommand.getNowItem());
	} else {
		this._windowInfo.setItem(null);
	}
};


Scene_MenuItemCollector.prototype.updatePlus = function() {
	this._windowPlus.setMaxIndex(this._windowCommand.maxItems());
	this._windowPlus.setNowIndex(this._windowCommand.index());
};


Scene_MenuItemCollector.prototype.updateMushInputs = function() {
	if (Input.isTriggered('ok')) {
		this.inputTriggeredOk();
	} else if (Input.isTriggered('escape')) {
		this.inputTriggeredEscape();
	}
};


Scene_MenuItemCollector.prototype.inputTriggeredOk = function() {
	if (this._action == 0) {
		SoundManager.playOk();
		this._action = 1;
		this._windowSections.deactivate();
		this._windowCommand.activate();
		if (this._windowCommand.index() < 0) this._windowCommand.select(0);
	}
};


Scene_MenuItemCollector.prototype.inputTriggeredEscape = function() {
	if (this._action == 0) {
		SoundManager.playCancel();
		this.popScene();
	} else if (this._action == 1) {
		SoundManager.playCancel();
		this._action = 0;
		this._windowSections.activate();
		this._windowCommand.deactivate();
	}
};


//==============================================================================================================
// * SECTION 2.0 : Window MenuCommand
//   - Create the scene
//==============================================================================================================


var aliasMush_WindowMenuCommandMakeCommandList58 = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function() {
    aliasMush_WindowMenuCommandMakeCommandList58.call(this);
    if ($mushFeatures.params['MIT_InMenu']) this.addItemCollectorCommand();
};


Window_MenuCommand.prototype.addItemCollectorCommand = function() {
	if (this.needsCommand($mushFeatures.params['MIT_MenuCommand'])) {
        var enabled = this.isItemCollectorEnabled();
        this.addCommand($mushFeatures.params['MIT_MenuCommand'], 'itemCollector', enabled);
        this.repositionItemCollector();
    }
};


Window_MenuCommand.prototype.isItemCollectorEnabled = function() {
	var enable = true;
	if ($mushFeatures.params['MIT_Switch']) {
		if ($mushFeatures.params['MIT_Switch'] > 0) {
			enable = $gameSwitches.value($mushFeatures.params['MIT_Switch']);
		}
	}
	return enable;
};


Window_MenuCommand.prototype.repositionItemCollector = function() {
	var itemCollector = null;
	for (var i = 0; i < this._list.length; i++) {
		if (this._list[i].symbol == 'itemCollector') {
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
// * SECTION 2.1 : Window ItemCollector Command
//   - Create the window command
//==============================================================================================================


function Window_ItemCollectorCommand() {
    this.initialize.apply(this, arguments);
};


Window_ItemCollectorCommand.prototype = Object.create(Window_Selectable.prototype);
Window_ItemCollectorCommand.prototype.constructor = Window_ItemCollectorCommand;


Window_ItemCollectorCommand.prototype.initialize = function(x, y, width, height) {
	this.setStartingProperties();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};


Window_ItemCollectorCommand.prototype.setStartingProperties = function() {
	this._secSymbol  = 'all'
	this._windowHelp = null;
	this.getAllItems();
	this.getItemList();
};


Window_ItemCollectorCommand.prototype.setWindowHelp = function(windowHelp) {
	this._windowHelp = windowHelp;
};


Window_ItemCollectorCommand.prototype.maxItems = function() {
    return this._itemList.length;
};


Window_ItemCollectorCommand.prototype.maxCols = function() {
    return 1;
};


Window_ItemCollectorCommand.prototype.getDataElements = function(type) {
	var allStuffs = [null];
	if (type == 'item')   var clone = $dataItems.clone();
	if (type == 'weapon') var clone = $dataWeapons.clone();
	if (type == 'armor')  var clone = $dataArmors.clone();
	if (Imported.YEP_ItemCore) {
		for (var i = 1 ; i < clone.length ; i++) {
			if (clone[i]) {
				if (i < Yanfly.Param.ItemStartingId) allStuffs.push( clone[i] );
			}
		}
	} else {
		for (var i = 1 ; i < clone.length ; i++) {
			allStuffs.push(clone[i]);
		}
	}
	return allStuffs;
};


Window_ItemCollectorCommand.prototype.getAllItems = function() {
	var itemList = [];
	var allStuffs = this.getDataElements('item');
	for (var i = 1 ; i < allStuffs.length ; i++) {
		var checked = false;
		if ($mushFeatures.params['MIT_ExcludedItems']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedItems'].length ; j++) {
				if (allStuffs[i].id == $mushFeatures.params['MIT_ExcludedItems'][j]) {
					checked = true;		
				}
			}
		}
		if (!checked && $mushFeatures.params['MIT_SectionIncludes'][allStuffs[i].itypeId - 1]) itemList[ itemList.length ] = allStuffs[i];
	}
	allStuffs = this.getDataElements('weapon');
	for (var i = 1 ; i < allStuffs.length ; i++) {
		var checked = false;
		if ($mushFeatures.params['MIT_ExcludedWeapons']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedWeapons'].length ; j++) {
				if (allStuffs[i].id == $mushFeatures.params['MIT_ExcludedWeapons'][j]) {
					checked = true;		
				}
			}
		}
		if (!checked && $mushFeatures.params['MIT_SectionIncludes'][4]) itemList[ itemList.length ] = allStuffs[i];
	}
	allStuffs = this.getDataElements('armor');
	for (var i = 1 ; i < allStuffs.length ; i++) {
		var checked = false;
		if ($mushFeatures.params['MIT_ExcludedArmors']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedArmors'].length ; j++) {
				if (allStuffs[i].id == $mushFeatures.params['MIT_ExcludedArmors'][j]) {
					checked = true;		
				}
			}
		}
		if (!checked && $mushFeatures.params['MIT_SectionIncludes'][5]) itemList[ itemList.length ] = allStuffs[i];
	}
	this._itemListFull = itemList.clone();
};


Window_ItemCollectorCommand.prototype.getItemList = function() {
	if (this._secSymbol == 'all') {
		this._itemList = this._itemListFull.clone();
	} else {
		this._itemList = [];
		for (var i = 0 ; i < this._itemListFull.length ; i++) {
			var it = this._itemListFull.clone()[i];
			if (this._secSymbol == 'regular') {
				if (DataManager.isItem(it) && it.itypeId == 1) this._itemList.push(it);
			} else if (this._secSymbol == 'key') {
				if (DataManager.isItem(it) && it.itypeId == 2) this._itemList.push(it);
			} else if (this._secSymbol == 'hiddenA') {
				if (DataManager.isItem(it) && it.itypeId == 3) this._itemList.push(it);
			} else if (this._secSymbol == 'hiddenB') {
				if (DataManager.isItem(it) && it.itypeId == 4) this._itemList.push(it);
			} else if (this._secSymbol == 'weapon') {
				if (DataManager.isWeapon(it)) this._itemList.push(it);
			} else if (this._secSymbol == 'armor') {
				if (DataManager.isArmor(it)) this._itemList.push(it);
			}
		}
	}
};


Window_ItemCollectorCommand.prototype.getNowItem = function() {
	return this._itemList[this._index];
};


Window_ItemCollectorCommand.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var it = this._itemList[index];
    if ($gameParty.getSeenItem(it)) {
    	this.drawIcon(it.iconIndex, rect.x, rect.y);
    	this.drawText(it.name, rect.x + 36, rect.y, rect.width);
    } else {
    	this.drawText('?????', rect.x, rect.y, rect.width, 'center');
    }
};


Window_ItemCollectorCommand.prototype.setSection = function(symbol) {
	if (this._secSymbol != symbol) {
		this._secSymbol = symbol;
		this.getItemList();
		this.refresh();
		this.select(-1);
	}
};


Window_ItemCollectorCommand.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if (this._windowHelp != null) {
		if ($gameParty.getSeenItem(this.getNowItem())) {
			this._windowHelp.setItem(this.getNowItem());
		} else {
			this._windowHelp.setText('');
		}
	}
};


//==============================================================================================================
// * SECTION 2.2 : Window ItemCollector Sections
//   - Create the window command
//==============================================================================================================


function Window_ItemCollectorSections() {
    this.initialize.apply(this, arguments);
};


Window_ItemCollectorSections.prototype = Object.create(Window_Selectable.prototype);
Window_ItemCollectorSections.prototype.constructor = Window_ItemCollectorSections;


Window_ItemCollectorSections.prototype.initialize = function(x, y, width, height) {
	this.setStartingProperties();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
    this.activate();
};


Window_ItemCollectorSections.prototype.setStartingProperties = function() {
	this._categories = [];
	this._secSymbol  = [];
	this._categories[0] = $mushFeatures.params['MIT_SectionAll'];
	this._secSymbol[0]  = 'all';
	if ($mushFeatures.params['MIT_SectionIncludes'][0]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionRegular'];
		this._secSymbol[ this._secSymbol.length ]   = 'regular'; 
	}
	if ($mushFeatures.params['MIT_SectionIncludes'][1]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionKey'];
		this._secSymbol[ this._secSymbol.length ]   = 'key'; 
	}
	if ($mushFeatures.params['MIT_SectionIncludes'][2]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionHiddenA'];
		this._secSymbol[ this._secSymbol.length ]   = 'hiddenA'; 
	}
	if ($mushFeatures.params['MIT_SectionIncludes'][3]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionHiddenB'];
		this._secSymbol[ this._secSymbol.length ]   = 'hiddenB'; 
	}
	if ($mushFeatures.params['MIT_SectionIncludes'][4]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionWeapon'];
		this._secSymbol[ this._secSymbol.length ]   = 'weapon'; 
	}
	if ($mushFeatures.params['MIT_SectionIncludes'][5]) {
		this._categories[ this._categories.length ] = $mushFeatures.params['MIT_SectionArmor'];
		this._secSymbol[ this._secSymbol.length ]   = 'armor'; 
	}
};


Window_ItemCollectorSections.prototype.maxItems = function() {
    return this._categories.length;
};


Window_ItemCollectorSections.prototype.maxCols = function() {
    return 1;
};


Window_ItemCollectorSections.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.drawText(this._categories[index], rect.x, rect.y, rect.width, 'center');
};


Window_ItemCollectorSections.prototype.getSymbol = function() {
	return this._secSymbol[this._index];
};


//==============================================================================================================
// * SECTION 2.3 : Window ItemCollector Info
//   - Create the window command
//==============================================================================================================


function Window_ItemCollectorInfo() {
    this.initialize.apply(this, arguments);
};


Window_ItemCollectorInfo.prototype = Object.create(Window_Base.prototype);
Window_ItemCollectorInfo.prototype.constructor = Window_ItemCollectorInfo;


Window_ItemCollectorInfo.prototype.initialize = function(x, y, width, height) {
	this.setStartingProperties();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};


Window_ItemCollectorInfo.prototype.setStartingProperties = function() {
	this._nowItem = null;
};


Window_ItemCollectorInfo.prototype.setItem = function(item) {
	if (this._nowItem != item) {
		this._nowItem = item;
		this.refresh();
	}
};


Window_ItemCollectorInfo.prototype.refresh = function() {
	this.contents.clear();
	if (this._nowItem != null && $gameParty.getSeenItem(this._nowItem)) {
		var it = this._nowItem;
		var backColor = $mushFeatures.params['MIT_ParametersBackColor'];
		var u = this.width - 36 - 128;
		this.contents.fillRect(0, 0, 128, 128, backColor);
		this.contents.fillRect(136, 0, u, 32, backColor);
		this.contents.fillRect(136, 54, u / 3 - 2, 32, backColor);
		this.contents.fillRect(140 + u / 3, 54, u / 3 * 2, 32, backColor);
		this.contents.fillRect(136, 96, u / 3 - 2, 32, backColor);
		this.contents.fillRect(140 + u / 3, 96, u / 3 * 2, 32, backColor);
		if (Imported.YEP_X_ItemPictureImg == true) {
			if (it.pictureImg != '' && it.pictureImg != undefined) {
				this.setUpYanflySprite(it.pictureImg, it.pictureHue);
			} else {
				this.clearSpriteYanfly();
				this.mush_drawIconPlus(it.iconIndex, 0, 0, 4);
			}
		} else {
			this.mush_drawIconPlus(it.iconIndex, 0, 0, 4);
		}
		this.changeTextColor(this.systemColor());
		this.drawText(it.name, 140, 0, this.width - 164, 'center');
		this.drawText($mushFeatures.params['MIT_TextId'] + ':', 138, 54, u / 3 - 10, 'left');
		this.drawText($mushFeatures.params['MIT_TextType'] + ':', 140 + u / 3 + 2, 54, u / 3 * 2, 'left');
		this.drawText($mushFeatures.params['MIT_TextOwn'] + ':', 138, 96, u / 3 - 10, 'left');
		this.drawText($mushFeatures.params['MIT_TextPrice'] + ':', 140 + u / 3 + 2, 96, u / 3 * 2, 'left');
		this.resetTextColor();
		var type = this.getItemType(it);
		var typeL = $mushFeatures.params['MIT_TextType'].length * 18;
		var quantity = this.getItemQuantity(it);
		this.drawText(it.id, 140, 54, u / 3 - 8, 'right');
		this.drawText(type, 140 + u / 3 + typeL, 54, u - (u / 3 + 18) - typeL, 'right');
		this.drawText(quantity? quantity : 0, 140, 96, u / 3 - 8, 'right');
		this.drawText(it.price, 140 + u / 3, 96, u - (u / 3 + 18), 'right');
		if (DataManager.isItem(it)) {
			this.drawInfoItem(it, backColor);
		} else if (DataManager.isWeapon(it) || DataManager.isArmor(it)) {
			this.drawInfoEquip(it, backColor);
		}
	} else {
		if (this._sprtYEP) {
			this._sprtYEP.hide();
		}
	}
};


Window_ItemCollectorInfo.prototype.mush_drawIconPlus = function(iconIndex, x, y, zoom) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    var zoomValue = pw * zoom;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, zoomValue, zoomValue);
};


Window_ItemCollectorInfo.prototype.getItemType = function(item) {
	if (DataManager.isItem(item)) {
		switch (item.itypeId) {
			case 1: return $mushFeatures.params['MIT_SectionRegular']; break;
			case 2: return $mushFeatures.params['MIT_SectionKey']; break;
			case 3: return $mushFeatures.params['MIT_SectionHiddenA']; break;
			case 4: return $mushFeatures.params['MIT_SectionHiddenB']; break;
		}
	} else if (DataManager.isWeapon(item)) {
		var wt = item.wtypeId;
		return $dataSystem.weaponTypes[wt];
	} else if (DataManager.isArmor(item)) {
		var at = item.atypeId;
		return $dataSystem.armorTypes[at];
	} else {
		return '';
	}
};


Window_ItemCollectorInfo.prototype.getItemQuantity = function(item) {
	var id = item.id;
	if (Imported.YEP_ItemCore) {
		var own = 0;
		var nowItems = [];
		if (DataManager.isItem(item)) {
			var list =  $gameParty._items;
			var data = $dataItems.clone();
		} else if (DataManager.isWeapon(item)) {
			var list = $gameParty._weapons;
			var data = $dataWeapons.clone();
		} else if (DataManager.isArmor(item)) {
			var list = $gameParty._armors;
			var data = $dataArmors.clone();
		} else {
			var list = [];
			var data = [];
		}
		for (var i = 1 ; i < data.length ; i++) {
			if (data[i]) {
				if (data[i].baseItemId == id || data[i].id == id) nowItems.push(i);
			}
		}
		for (var i = 0 ; i < nowItems.length ; i++) {
			if ( list[ nowItems[i] ] ) {
				own += list[ nowItems[i] ];
			}
		}
		return own;
	} else { 
		if (DataManager.isItem(item)) {
			return $gameParty._items[id];
		} else if (DataManager.isWeapon(item)) {
			return $gameParty._weapons[id];
		} else if (DataManager.isArmor(item)) {
			return $gameParty._armors[id];
		} else {
			return 0;
		}
	}
};


Window_ItemCollectorInfo.prototype.drawInfoItem = function(it, backColor) {
	var u = (this.width - 36) / 2;
	var y = 136;
	var h = 36;
	this.contents.fillRect(0, y, u - 4, 36 * 5, backColor);
	this.contents.fillRect(u + 4, y, u - 4, 36 * 5, backColor);
	this.changeTextColor(this.systemColor());
	this.drawText($mushFeatures.params['MIT_TextHpRecover+'] + ':', 2, y + h * 0, u / 2);
	this.drawText($mushFeatures.params['MIT_TextHpRecover%'] + ':', 2, y + h * 1, u / 2);
	this.drawText($mushFeatures.params['MIT_TextMpRecover+'] + ':', 2, y + h * 2, u / 2);
	this.drawText($mushFeatures.params['MIT_TextMpRecover%'] + ':', 2, y + h * 3, u / 2);
	this.drawText($mushFeatures.params['MIT_TextTpGain'] + ':',     2, y + h * 4, u / 2);
	this.drawText($mushFeatures.params['MIT_TextAddState'] + ':',   u + 6, y + h * 0, u - 6);
	this.drawText($mushFeatures.params['MIT_TextRemoveState'] + ':',   u + 6, y + h * 2.5, u - 6);
	this.resetTextColor();
	var textData = {'hpAdd': '----', 'hpPour': '----', 'mpAdd': '----', 'mpPour': '----', 'tpAdd': '----'};
	var states = {'add': [], 'remove': []};
	for (var i = 0 ; i < it.effects.length ; i++) {
		var ef = it.effects[i];
		if (ef.code == 11) { // Heal Hp
			if (ef.dataId == 0) {
				if (ef.value1 != 0) textData['hpPour'] = ef.value1 * 100 + '%';
				if (ef.value2 != 0) textData['hpAdd']  = ef.value2;
			}
		} else if (ef.code == 12) { // Heal Mp
			if (ef.dataId == 0) {
				if (ef.value1 != 0) textData['mpPour'] = ef.value1 * 100 + '%';
				if (ef.value2 != 0) textData['mpAdd']  = ef.value2;
			}
		} else if (ef.code == 13) { // Tp Gain
			if (ef.dataId == 0) {
				if (ef.value1 != 0) textData['tpAdd'] = ef.value1;
			}
		} else if (ef.code == 21) { // add States
			if (ef.dataId != 0) {
				states['add'].push(ef.dataId);
			} 
		} else if (ef.code == 22) { // remove States
			if (ef.dataId != 0) {
				states['remove'].push(ef.dataId);
			} 
		}
	}
	if (textData.hpAdd >= 0) {
		textData.hpAdd = '+' + textData.hpAdd;
	} 
	if (textData.mpAdd >= 0) {
		textData.mpAdd = '+' + textData.mpAdd;
	} 
	if (textData.tpAdd >= 0) {
		textData.tpAdd = '+' + textData.tpAdd;
	} 
	this.drawText(textData.hpAdd,  u / 2, y + h * 0, u / 2 - 8, 'right');
	this.drawText(textData.hpPour, u / 2, y + h * 1, u / 2 - 8, 'right');
	this.drawText(textData.mpAdd,  u / 2, y + h * 2, u / 2 - 8, 'right');
	this.drawText(textData.mpPour, u / 2, y + h * 3, u / 2 - 8, 'right');
	this.drawText(textData.tpAdd,  u / 2, y + h * 4, u / 2 - 8, 'right');
	if (states['add'].length > 0) {
		for (var i = 0 ; i < states['add'].length ; i++) {
			var x = this.width - 70 - 34 * i;
			var icon = $dataStates[ states['add'][i] ].iconIndex;
			this.drawIcon(icon, x, y + h * 1);
		}
	} else {
		this.drawText('------', u + 6, y + h * 1, u - 8, 'right');
	}
	if (states['remove'].length > 0) {
		for (var i = 0 ; i < states['remove'].length ; i++) {
			var x = this.width - 70 - 34 * i;
			var icon = $dataStates[ states['remove'][i] ].iconIndex;
			this.drawIcon(icon, x, y + h * 3.5);
		}
	} else {
		this.drawText('------', u + 6, y + h * 3.5, u - 8, 'right');
	}
};


Window_ItemCollectorInfo.prototype.drawInfoEquip = function(it, backColor) {
	var u = (this.width - 36) / 2;
	var y = 136;
	// Yanfly
	var ac = $gameParty.members()[0];
	// test end
	var paramConverter = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	this.contents.fillRect(0, y, u * 2, 32 * 4, backColor);
	this.contents.fillRect(0, y + 134, u - 4, 36 * 2, backColor);
	this.contents.fillRect(u + 4, y + 134, u - 4, 36 * 2, backColor);
	for (var i = 0 ; i < 8 ; i++) {
		if (Imported.YEP_EquipCore) {
			if ($mushFeatures.params['MIT_YEP_EquipCoreLunaticFactor']) {
				var newParam = it.params[i] + ac.evalParamPlus(it, i);
			} else {
				var newParam = it.params[i];
			}
		} else {
			var newParam = it.params[i];
		}
		var xPos = u * (i % 2) + 2;
		var yPos = y + 32 * Math.floor(i / 2);
		if ($mushFeatures.params['MIT_ParametersBar']) {
			var color = $mushFeatures.params[ 'MIT_ParametersBarColor' + paramConverter[i] ];
			var highest = this.getEquipHighestParam(it);
			var barWidth = (u - 108) * (newParam / highest);
			this.contents.fillRect(xPos + u - 12 - barWidth, yPos + 16, barWidth, 12, color);
		}
		var icon = $mushFeatures.params['MIT_ParametersIcons'][i];
		var haveIcon = false;
		if (icon && icon != -1) {
			this.drawIcon(icon, xPos, yPos);
			haveIcon = true;
		}
		this.changeTextColor(this.systemColor());
		this.drawText($mushFeatures.params['MIT_ParametersText'][i] + ':', haveIcon? (xPos+36) : xPos, yPos, 144);
		this.resetTextColor();
		this.drawText(newParam, xPos, yPos, u - 16, 'right');
	}
	this.changeTextColor(this.systemColor());
	this.drawText($mushFeatures.params['MIT_ElementWeakText'] + ':', 2, y + 134, u - 16);
	this.drawText($mushFeatures.params['MIT_ElementResistText'] + ':', u + 6, y + 134, u - 16);
	this.resetTextColor();
	var elements = {'weak': [], 'resist': []};
	for (var i = 0 ; i < it.traits.length ; i++) {
		var tt = it.traits[i];
		if (tt.code == 11) { // code for elements
			if (tt.value > 1) elements['weak'].push(tt.dataId);
			if (tt.value < 1) elements['resist'].push(tt.dataId);
		}
	}
	if (elements['weak'].length > 0) {
		for (var i = 0 ; i < elements['weak'].length ; i++) {
			var x = u - 38 - 34 * i;
			var icon = $mushFeatures.params['MIT_ElementIcons'][ elements.weak[i] - 1 ];
			this.drawIcon(icon, x, y + 166);
		}
	} else {
		this.drawText('------', 2, y + 166, u - 8, 'right');
	}
	if (elements['resist'].length > 0) {
		for (var i = 0 ; i < elements['resist'].length ; i++) {
			var x = this.width - 70 - 34 * i;
			var icon = $mushFeatures.params['MIT_ElementIcons'][ elements.resist[i] - 1 ];
			this.drawIcon(icon, x, y + 166);
		}
	} else {
		this.drawText('------',  u + 2, y + 166, u - 4, 'right');
	}
};


Window_ItemCollectorInfo.prototype.getEquipHighestParam = function(it) {
	var curHighest = 0;
	var ac = $gameParty.members()[0];
	for (var i = 0 ; i < 8 ; i++) {
		if (Imported.YEP_EquipCore) {
			if ($mushFeatures.params['MIT_YEP_EquipCoreLunaticFactor']) {
				var newParam = it.params[i] + ac.evalParamPlus(it, i);
			} else {
				var newParam = it.params[i];
			}
		} else {
			var newParam = it.params[i];
		}
		if (newParam > curHighest) curHighest = 0 + newParam;
	}
	return curHighest;
};


Window_ItemCollectorInfo.prototype.setUpYanflySprite = function(filename, hue) {
	if (this._sprtYEP) {
		this._updateSprtYEP = true;
		this._sprtYEP.bitmap = ImageManager.loadPicture(filename, hue);
		this._sprtYEP.hide();
	} else {
		this._updateSprtYEP = true;
		this._sprtYEP = new Sprite_Base();
		this._sprtYEP.x += 18;
		this._sprtYEP.y += 18;
		this._sprtYEP.hide();
		this.addChild(this._sprtYEP);
		this._sprtYEP.bitmap = ImageManager.loadPicture(filename, hue);
	}
};


Window_ItemCollectorInfo.prototype.clearSpriteYanfly = function() {
	if (this._sprtYEP) {
		this._sprtYEP.hide();
	}
};


Window_ItemCollectorInfo.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	if (this._updateSprtYEP) {
		if (this._sprtYEP.width && this._sprtYEP.height) {
			if ($mushFeatures.params['MIT_YEP_ItemPictureScale']) {
				szX = 128;
				szY = 128;
			} else {
				szX = Yanfly.Param.ItemImageMaxWidth;
				szY = Yanfly.Param.ItemImageMaxHeight;
			}
			this._sprtYEP.scale.x = szX / this._sprtYEP.width;
			this._sprtYEP.scale.y = szY / this._sprtYEP.height;
			this._sprtYEP.show();
			this._updateSprtYEP = false;
		}
	}
};


//==============================================================================================================
// * SECTION 2.4 : Window ItemCollector Plus
//   - Create the window command
//==============================================================================================================


function Window_ItemCollectorPlus() {
    this.initialize.apply(this, arguments);
};


Window_ItemCollectorPlus.prototype = Object.create(Window_Base.prototype);
Window_ItemCollectorPlus.prototype.constructor = Window_ItemCollectorPlus;


Window_ItemCollectorPlus.prototype.initialize = function(x, y, width, height) {
	this.setStartingProperties();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};


Window_ItemCollectorPlus.prototype.setStartingProperties = function() {
	this._nowIndex = -1;
	this._maxIndex = -1;
	this._section  = 'all';
};


Window_ItemCollectorPlus.prototype.setNowIndex = function(index) {
	if (this._nowIndex != index) {
		this._nowIndex = index;
		this.refresh();
	}
};


Window_ItemCollectorPlus.prototype.setMaxIndex = function(max) {
	if (this._maxIndex != max) {
		this._maxIndex = max;
		this.refresh();
	}
};


Window_ItemCollectorPlus.prototype.setSection = function(section) {
	if (this._section != section) {
		this._section = section;
		this.refresh();
	}
};


Window_ItemCollectorPlus.prototype.refresh = function() {
	var u = (this.width - 36);
	this.contents.clear();
	if (this._nowIndex >= 0 && this._maxIndex >= 0) {
		var nowText = (this._nowIndex + 1) + '/' + (this._maxIndex);
		this.drawText(nowText, this.width - 36 - 200, 0, 200, 'right');  
	} else {
		this.drawText('-----', this.width - 36 - 200, 0, 200, 'right');  
	}
	this.changeTextColor(this.systemColor());
	this.drawText($mushFeatures.params['MIT_TextCompletion'], 0, 0, u / 2);
	this.drawText(this.getSectionName() + ':', 0, 36, u / 3);
	this.resetTextColor();
	if (this._section == 'all') {
		this.drawCompletionSection(u, 'all');
	} else if (this._section == 'regular' || this._section == 'key' || this._section == 'hiddenA' || this._section == 'hiddenB') {
		this.drawCompletionSection(u, 'items');
	} else if (this._section == 'weapon') {
		this.drawCompletionSection(u, 'weapons');
	} else if (this._section == 'armor') {
		this.drawCompletionSection(u, 'armors');
	}
	this.drawCompletionChest(u);
};


Window_ItemCollectorPlus.prototype.getSectionName = function() {
	var section = '';
	switch (this._section) {
		case 'all': section = $mushFeatures.params['MIT_SectionAll']; break;
		case 'regular': section = $mushFeatures.params['MIT_SectionRegular']; break;
		case 'key':     section = $mushFeatures.params['MIT_SectionKey']; break;
		case 'hiddenA': section = $mushFeatures.params['MIT_SectionHiddenA']; break;
		case 'hiddenB': section = $mushFeatures.params['MIT_SectionHiddenB']; break;
		case 'weapon':  section = $mushFeatures.params['MIT_SectionWeapon']; break;
		case 'armor':   section = $mushFeatures.params['MIT_SectionArmor']; break;
	}
	return section;
};


Window_ItemCollectorPlus.prototype.getSectionType = function() {
	var section = -1;
	switch (this._section) {
		case 'regular': section = 1; break;
		case 'key':     section = 2; break;
		case 'hiddenA': section = 3; break;
		case 'hiddenB': section = 4; break;
	}
	return section;
};


Window_ItemCollectorPlus.prototype.drawCompletionSection = function(u, symbol) {
	var allItems = $gameParty.getItemCollectorList();
	var barMaxWidth = u / 3 * 2 - 12;
	var seen = 0;
	var total = 0;
	if (symbol != 'all') {
		for (var i = 0 ; i < allItems[symbol].length ; i++) {
			if (symbol == 'items') {
				var sectionType = this.getSectionType();
				if (allItems[symbol][i].type == sectionType) {
					if (allItems[symbol][i].seen && allItems[symbol][i].show) seen += 1;
					if (allItems[symbol][i].show) total += 1;
				}
			} else {
				if (allItems[symbol][i].seen && allItems[symbol][i].show) seen += 1;
				if (allItems[symbol][i].show) total += 1;
			}
		}
	} else {
		var allSectionsItems = allItems.items.concat(allItems.weapons, allItems.armors);
		for (var i = 0 ; i < allSectionsItems.length ; i++) {
			if (allSectionsItems[i].seen && allSectionsItems[i].show) seen += 1;
			if (allSectionsItems[i].show) total += 1;
		}
	}
	var pour = seen / total.clamp(1, 99999999);
	var barWidth = (Math.floor(pour * barMaxWidth)).clamp(0, barMaxWidth);
	this.contents.fillRect(u / 3 + 12, 72 - this.contents.fontSize + 12, barMaxWidth, 12, this.gaugeBackColor());
	this.contents.gradientFillRect(u / 3 + 12 + (barMaxWidth - barWidth), 72 - this.contents.fontSize + 12, barWidth, 12,
					$mushFeatures.params['MIT_SectionBarColor1'], $mushFeatures.params['MIT_SectionBarColor2']);
	this.drawText( Math.floor(pour * 100) + '%', u / 3 + 12, 36, barMaxWidth, 'right' );
};


Window_ItemCollectorPlus.prototype.drawCompletionChest = function(u) {
	if ($mushFeatures.params['MIT_ChestVariable'] && $mushFeatures.params['MIT_ChestTotal']) {
		if ($mushFeatures.params['MIT_ChestVariable'] > 0 && $mushFeatures.params['MIT_ChestTotal'] > 0) {
			this.changeTextColor(this.systemColor());
			this.drawText($mushFeatures.params['MIT_TextChest'] + ':', 0, 72, u / 3);
			this.resetTextColor();
			var vr = $mushFeatures.params['MIT_ChestVariable'];
			var opened = $gameVariables.value(vr);
			var total  = $mushFeatures.params['MIT_ChestTotal'];
			var pour = opened / total.clamp(1, 99999999);
			var barMaxWidth = u / 3 * 2 - 12;
			var barWidth = (Math.floor(pour * barMaxWidth)).clamp(0, barMaxWidth);
			this.contents.fillRect(u / 3 + 12, 108 - this.contents.fontSize + 12, barMaxWidth, 12, this.gaugeBackColor());
			this.contents.gradientFillRect(u / 3 + 12 + (barMaxWidth - barWidth), 108 - this.contents.fontSize + 12, barWidth, 12,
							$mushFeatures.params['MIT_ChestBarColor1'], $mushFeatures.params['MIT_ChestBarColor2']);
			this.drawText( (Math.floor(pour * 100)).clamp(0, 100) + '%', u / 3 + 12, 72, barMaxWidth, 'right' );
		} 
	}
};


//==============================================================================================================
// * SECTION 3.0 : Game Party
//   - Create the item collector tracker
//==============================================================================================================


var aliasMush_GamePartyInitialize86 = Game_Party.prototype.initialize; 
Game_Party.prototype.initialize = function() {
    aliasMush_GamePartyInitialize86.call(this);
    this._itemCollectList = this.mush_setBaseItemCollectorList();
};


Game_Party.prototype.mush_setBaseItemCollectorList = function() {
	itList = {
    	'items':   [],
    	'weapons': [],
    	'armors':  []
    }
	for (var i = 1 ; i < $dataItems.length ; i++) {
		if (!$dataItems[i]) break;
		if (Imported.YEP_ItemCore) {
			if (i >= Yanfly.Param.ItemStartingId) break;
		}
		var show = true;
		var name = $dataItems[i].name || '';
		var seen = false;
		var type = $dataItems[i].itypeId || 0;
		if ($mushFeatures.params['MIT_ExcludedItems']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedItems'].length ; j++) {
				if ($dataItems[i].id == $mushFeatures.params['MIT_ExcludedItems'][j]) {
					show = false;		
				}
			}
		}
		var nowItem = {'name': name, 'show': show, 'seen': seen, 'type': type};
		itList['items'].push(nowItem)
	}
	for (var i = 1 ; i < $dataWeapons.length ; i++) {
		if (!$dataWeapons[i]) break;
		if (Imported.YEP_ItemCore) {
			if (i >= Yanfly.Param.ItemStartingId) break;
		}
		var show = true;
		var name = $dataWeapons[i].name || '';
		var seen = false;
		if ($mushFeatures.params['MIT_ExcludedWeapons']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedWeapons'].length ; j++) {
				if ($dataWeapons[i].id == $mushFeatures.params['MIT_ExcludedWeapons'][j]) {
					show = false;		
				}
			}
		}
		var nowWeapon = {'name': name, 'show': show, 'seen': seen};
		itList['weapons'].push(nowWeapon);
	}
	for (var i = 1 ; i < $dataArmors.length ; i++) {
		if (!$dataArmors[i]) break;
		if (Imported.YEP_ItemCore) {
			if (i >= Yanfly.Param.ItemStartingId) break;
		}
		var show = true;
		var name = $dataArmors[i].name || '';
		var seen = false;
		if ($mushFeatures.params['MIT_ExcludedArmors']) {
			for (var j = 0 ; j < $mushFeatures.params['MIT_ExcludedArmors'].length ; j++) {
				if ($dataArmors[i].id == $mushFeatures.params['MIT_ExcludedArmors'][j]) {
					show = false;		
				}
			}
		}
		var nowArmor = {'name': name, 'show': show, 'seen': seen};
		itList['armors'].push(nowArmor);
	}
	return itList;
};


Game_Party.prototype.hardReset_ItemCollectorList = function() {
	if ($mushFeatures.params['MIT_HardReset']) {
		this._itemCollectList = this.mush_setBaseItemCollectorList();
	} 
};


Game_Party.prototype.checkInitializedItemCollector = function() {
	if (this._itemCollectList == undefined) {
		this._itemCollectList = this.mush_setBaseItemCollectorList();
	} else {
		if ($mushFeatures.params['MIT_AutoUpdate']) {
			this.itemCollector_AutoUpdate('items');
			this.itemCollector_AutoUpdate('weapons');
			this.itemCollector_AutoUpdate('armors');
		}
	}
};


Game_Party.prototype.itemCollector_AutoUpdate = function(type) {
	var haveToReset = false;
	var tempList = this.mush_setBaseItemCollectorList();
	if (this._itemCollectList[type].length != tempList[type].length) {
		this._itemCollectList = this.mush_setBaseItemCollectorList();
		return;
	}
	for (var i = 0; i < tempList[type].length ; i++) {
		if (this._itemCollectList[type][i] && tempList[type][i]) {
			if (this._itemCollectList[type][i].name == tempList[type][i].name) {
				this._itemCollectList[type][i].show = tempList[type][i].show;
			} else {
				this._itemCollectList = this.mush_setBaseItemCollectorList();
				break;
			}
		} else {
			this._itemCollectList = this.mush_setBaseItemCollectorList();
			break;
		}
	}
};


Game_Party.prototype.getItemCollectorList = function() {
	return this._itemCollectList;
};


Game_Party.prototype.getSeenItem = function(item) {
	if (DataManager.isItem(item)) var type = 'items';
	if (DataManager.isWeapon(item)) var type = 'weapons';
	if (DataManager.isArmor(item)) var type = 'armors';
	if (type) {
		var id = item.id - 1;
		if (Imported.YEP_ItemCore) {
			if (id >= Yanfly.Param.ItemStartingId) id = item.baseItemId - 1;
		}
		var seen = this._itemCollectList[type][id].seen;
		return seen;
	} else {
		return false;
	}
};


var aliasMush_GamePartyGainItem17 = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    aliasMush_GamePartyGainItem17.call(this, item, amount, includeEquip);
    if (item) {
    	this.checkInitializedItemCollector();
	    var id = item.id - 1;
	    if (Imported.YEP_ItemCore) {
	    	if (id >= Yanfly.Param.ItemStartingId) id = item.baseItemId - 1;
	    }
	    if (DataManager.isItem(item) && id >= 0) {
	    	this._itemCollectList['items'][id].seen = true;
	    } else if (DataManager.isWeapon(item) && id >= 0) {
	    	this._itemCollectList['weapons'][id].seen = true;
	    } else if (DataManager.isArmor(item) && id >= 0) {
	    	this._itemCollectList['armors'][id].seen = true;
	    }
    }
};


Game_Party.prototype.getCompletionItemCollector = function(category) {
	var dt = this._itemCollectList;
	var allData = [];
	var itTotal = 0;
	var itSeen = 0;
	if (category == 'all' || category == 'items') {
		for (var i = 0 ; i < dt['items'].length ; i++) {
			allData.push(dt['items'][i]);
		}
	}
	if (category == 'all' || category == 'armors') {
		for (var i = 0 ; i < dt['armors'].length ; i++) {
			allData.push(dt['armors'][i]);
		}
	}
	if (category == 'all' || category == 'weapons') {
		for (var i = 0 ; i < dt['weapons'].length ; i++) {
			allData.push(dt['weapons'][i]);
		}
	}
	for (var i = 0 ; i < allData.length ; i++) {
		var it = allData[i];
		if (it.show) {
			itTotal += 1;
		}
		if (it.show && it.seen) {
			itSeen += 1;
		}
	}
	if (itTotal > 0) {
		var pour = Math.floor(itSeen / itTotal * 100);
		return pour;
	} else {
		return 0;
	}
};


//==============================================================================================================
// * SECTION 3.1 : Game Interpreter
//   - setting the plugin commands
//==============================================================================================================


var aliasMush_GameInterpreterPluginCommand92 = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
        aliasMush_GameInterpreterPluginCommand92.call(this, command, args);
        if (command === 'ItemCollector') {
            switch (args[0]) {
            case 'open':
                SceneManager.push(Scene_MenuItemCollector);
                break;
            case 'add':
                $gameParty._itemCollectList[ args[1] ][ args[2] - 1 ].seen = true;
                break;
            case 'remove':
                $gameParty._itemCollectList[ args[1] ][ args[2] - 1 ].seen = false;
                break;
            case 'getCompletion':
            	var variableId = args[2];
            	var value = $gameParty.getCompletionItemCollector(args[1]);
            	$gameVariables.setValue(variableId, value);
            }
        }
    };
