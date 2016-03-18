Ext.define('NotesandPasswords.view.Loginview', {
    extend: 'Ext.Panel',
    xtype: 'loginview',
      requires: ['Ext.TitleBar','NotesandPasswords.controller.Appcontrol'],
      controller:'login',
    config: {
        items:[
            {    
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Notes and Passwords'
                },{               
            items: [
        {
            xtype: 'fieldset',
            title: 'LOGIN',
            margin:'100px 10px 10px 10px',
            items: [
                {
                    xtype: 'textfield',
                    label: 'USER NAME',
                    allowBlank: false,
                    name: 'username',
                    id:'loginname'
                },{
                    xtype: 'passwordfield',
                    label: 'PASSWORD',
                    allowBlank: false,
                    name: 'password',
                    id:'loginpass'
                }                
            ],
        }
    ]
                },{
                    xtype: 'button',
                    text: 'ENTER',
                    id:'btnlogin',                
                    margin:'20px 10px 10px 10px',
                    ui:'confirm'        
                },{
                    xtype: 'fieldset',
                    title: 'NEW USER ?',                   
               items:[
                    {     
                     xtype: 'button',
                    text: 'REGISTER',
                    id:'btnregister',                                    
                    ui:'confirm'                     
                    } ]                             
                  }           
            ]       
           }
});