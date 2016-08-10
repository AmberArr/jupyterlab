// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Menu
} from 'phosphor/lib/ui/menu';

import {
  MenuBar
} from 'phosphor/lib/ui/menubar';

import {
  Widget
} from 'phosphor/lib/ui/widget';

import {
  JupyterLab, JupyterLabPlugin
} from '../application';

import {
  IMainMenu, MainMenu
} from './';


/**
 * The class name for all main area portrait tab icons.
 */
const PORTRAIT_ICON_CLASS = 'jp-MainAreaPortraitIcon';

/**
 * The class name for the jupyter icon from the default theme.
 */
const JUPYTER_ICON_CLASS = 'jp-JupyterIcon';


/**
 * A service providing an interface to the main menu.
 */
export
const mainMenuProvider: JupyterLabPlugin<IMainMenu> = {
  id: 'jupyter.services.main-menu',
  provides: IMainMenu,
  activate: activateMainMenu
};


/**
 * Activate the main menu extension.
 */
function activateMainMenu(app: JupyterLab): IMainMenu {
  Private.menuBar = new MenuBar({ keymap: app.keymap });
  Private.menuBar.id = 'jp-MainMenu';

  let logo = new Widget();
  logo.node.className = `${PORTRAIT_ICON_CLASS} ${JUPYTER_ICON_CLASS}`;
  logo.id = 'jp-MainLogo';

  app.shell.addToTopArea(logo);
  app.shell.addToTopArea(Private.menuBar);

  return Private.mainMenu;
}


/**
 * A namespace for private data.
 */
namespace Private {
  /**
   * The singleton menu bar instance.
   */
  export
  let menuBar: MenuBar;

  /**
   * The singleton main menu instance.
   */
  export
  const mainMenu = new MainMenu();


  /**
   * An object which holds a menu and its sort rank.
   */
  export
  interface IRankItem {
    /**
     * The menu for the item.
     */
    menu: Menu;

    /**
     * The sort rank of the menu.
     */
    rank: number;
  }

  /**
   * A comparator function for menu rank items.
   */
  export
  function itemCmp(first: IRankItem, second: IRankItem): number {
    return first.rank - second.rank;
  }
}
