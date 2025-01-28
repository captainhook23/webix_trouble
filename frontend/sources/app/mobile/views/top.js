import { JetView } from 'webix-jet';

import MenuView from '../components/menu';
import HeaderView from '../components/header';

export default class TopView extends JetView {
    config() {
       

       

       

        const ui = {
            width: window.innerWidth,
            rows: [
                HeaderView,
                 { 
                    $subview: true 
                }, 
                MenuView
            ],
        };

        return ui;
    }

    urlChange() {
        
    }

    init() {
        this.on(this.app, 'app:resize', (size) => {
            this.getRoot().define('width', size);
            this.getRoot().resize();
        });

        this.app.attachEvent('menu:toggle', () => {
            this.toggleMenu();
        });
    }

    
}
