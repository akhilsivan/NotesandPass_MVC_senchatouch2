Ext.define('NotesandPasswords.view.Navview', {
    extend : 'Ext.Menu',
    xtype : 'navview',    
    config : {
        scrollable : {
            direction : 'vertical',
            directionLock : true,
            momentumEasing : {
                momentum : {
                    acceleration : 30,
                    friction : 0.5
                },
                bounce : {
                    acceleration : 0.0001,
                    springTension : 0.9999
                },
                minVelocity : 5
            },
            outOfBoundRestrictFactor : 0
        },       
        width : '75%',
        items : [{          
            xtype : 'container',
            docked : 'top',
            height : '0%',
            cls : 'profile',            
        },{            
            text : 'NOTES AND PASSWORDS'                            
        },{
            text : 'NOTES',           
            iconCls : 'compose',
            navButton : true,          
            action : 'notesview',                    
        },{
            text : 'PASSWORDS',
            iconCls : 'more',
            navButton : true,
            action : 'passwordview'
        }]
    }    
});