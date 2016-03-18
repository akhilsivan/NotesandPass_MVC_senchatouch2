Ext.define('NotesandPasswords.view.Main', {
    extend : 'Ext.navigation.View',
    xtype : 'main',
     requires: [
        'Ext.Button'
    ],
  config : {
        fullscreen : true,
     //nav starts here !!!
        navigationBar : {            
            cls : 'topNavBar',           
            animation : false,
            items : [{                
                align : 'left',
                title:'Notes and Passwords',
                handler : function() {
                Ext.Viewport.showMenu('left');                             
                }
            }]
        }
    },
});