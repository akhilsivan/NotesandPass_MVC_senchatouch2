Ext.define("NotesandPasswords.view.PasswordEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.passwordeditor",
    xtype:'passwordeditor',
    config:{
        scrollable:'vertical',
        title: 'PASSWORDS',    
items:[{    
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'EDIT PASSWORD'},{ 
                  layout:'hbox',
                    docked:'bottom',
                    items:[
               {  
    	    xtype: "button",
            margin:'10px 0px 0px 0px',
    	    ui:'confirm',
    	    text: "DISCARD",
            width:'50%',
            id:'btndelete',
            handler: this.onDeleteButtonTap,
    	    scope: this
    	},{
    	    xtype: "button",
            margin:'10px 0px 0px 0px',
    	    ui:'confirm',
    	    text: "SAVE",
            width:'50%',
            id:'btnsave',
            handler: this.onSaveButtonTap,
    	    scope: this

    	}]},
 /*
        var topToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [                        
            ]
     };
*/
    /*    var deleteButton = {
            xtype: "button",
            margin:'10px 0px 0px 0px',
            iconCls: "trash",
            iconMask: true,
            handler: this.onDeleteButtonTap,
            scope: this
        };
*/
 {
           xtype: 'textfield',
            name: 'title',
            label: 'Title',
            id:'passwordeditortitle',
           required: true
        },{
            xtype: 'textareafield',
            name: 'narrative',
            id:'passwordeditornarrative',
            label: 'Narrative'
        }
]

},
initialize:function() {
this.callParent(arguments); 
    },
    onSaveButtonTap: function () {
        console.log("savePasswordCommand");
        this.fireEvent("savePasswordCommand", this);
    },
    onBackButtonTap: function () {
    	console.log("backButtonCommand");
    	this.fireEvent("backButtonCommand", this);
    },
    onDeleteButtonTap: function () {
    	console.log("deleteButtonCommand");
    	this.fireEvent("deleteButtonCommand");
    }
});