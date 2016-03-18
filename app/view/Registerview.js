Ext.define('NotesandPasswords.view.Registerview', {
    extend: 'Ext.Panel',
    xtype: 'registerview',
    requires: ['Ext.TitleBar'],
    config: {
        title: 'REGISTER',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'REGISTER',
            }, {
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'ENTER DETAILS',
                        id: 'registerview',
                        margin: '170px 10px 10px 10px',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'USER NAME',
                                name: 'username',
                                id: 'registerusername'
                            }, {
                                xtype: 'passwordfield',
                                label: 'PASSWORD',
                                name: 'password',
                                id: 'registerpassword'
                            }
                        ],
                    }
                ]
            }, {
                layout: 'hbox',
                docked: 'bottom',
                items: [
                    {
                        xtype: 'button',
                        margin: '0px 1px 3px 3px',
                        text: 'CANCEL',
                        id: 'btncancel',
                        width: '50%',
                        ui: 'confirm'
                    }, {
                        xtype: 'button',
                        margin: '0px 3px 3px 1px',
                        text: 'SUBMIT',
                        id: 'btnsubmit',
                        width: '50%',
                        ui: 'confirm'
                    }]
            }
        ]
    }
});