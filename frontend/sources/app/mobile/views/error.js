    import { $$ } from 'webix';
    import { JetView } from 'webix-jet';

    export default class ErrorView extends JetView {
        config() {
            return {
                
                rows: [
                   
                    {
                        view: 'template',
                        
                                
                                    template: `
                                    <div style="
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        flex-direction: column;
                                        text-align: center;
                                        color: #555;
                                        font-family: 'Arial', sans-serif;
                                        font-size: 24px;
                                    ">
                                        
                                        <div style="margin-bottom: 20px;">
                                            404 Not found.
                                        </div>
                                        <img src="sources/assets/Luigi.png" 
                                            alt="Princess Peach" 
                                            style="
                                                height: ${window.innerHeight-150}px;
                                                max-height: 200px;
                                                border-radius: 10px;
                                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                                            "
                                        />
                                    </div>
                                    `,
                                },
                                
                       
                       
                    
                   
                    
                ]
            };
        }

        init() {
            const activeLabel = $$('active-label');
            if (activeLabel) {
                activeLabel.setValue("Error");
                webix.storage.local.put('activeLabel', 'Error');
            }

            this.on(this.app, 'app:error:resolve', (view ,role) => {
                webix.message({ type: 'error', text: `Access denied from ${view.app.config.name}[${view.label}], not enough rights as [${role}]` });
            });

            this.on(this.app, 'app:resize', () => {
                // resize the image
                const img = document.querySelector('img');
                img.style.height = `${window.innerHeight-150}px`;
            });
        }
    }
