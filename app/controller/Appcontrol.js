Ext.define('NotesandPasswords.controller.Appcontrol', {
    extend: 'Ext.app.Controller',
    alias: 'controller.login',
    config: {
        views: [
            'Main',
            'Loginview',
            'Notesview',
            'NoteEditor',
            'NotesList',
            'PasswordEditor',
            'PasswordList',
            'Registerview',
            'Passwordview',
            'Navview'
        ],

        refs: {
            Main: 'main',
            Loginview: 'loginview',
            notesview: 'notesview',
            noteeditor: 'noteeditor',
            Registerview: 'registerview',
            passwordview: 'passwordview',
            passwordeditor: 'passwordeditor',
            Navview: 'navview',
            navigationView: 'navigationview'
        },
        control: {

            'loginview #btnlogin': {
                tap: 'onlogintap'
            },
            'loginview #btnregister': {
                tap: 'showregisterpage'
            },
            'passwordview #btnsave': {
                tap: 'savepassword'
            },
            'registerview #btncancel': {
                tap: 'showloginpage'
            },
            'registerview #btnsubmit': {
                tap: 'register'
            },
            'navview > button[navButton]': {
                tap: 'navButtonTap'
            },
            'notesview  #btnadd': { tap: 'gotoeditor' },
            'passwordview  #btnadd': { tap: 'gotopasseditor' },
            'noteslist': {
                disclose: 'shownoteeditor'
            },
            'passwordlist': {
                disclose: 'showpasswordeditor'
            },
            notesview: {
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand",
                show: "loadnotesview",
            },
            'noteeditor  #btnsave': { tap: 'notesave' },
            'noteeditor  #btndelete': { tap: 'notedelete' },
            noteeditor: {
                saveNoteCommand: "onSaveNoteCommand",
                backButtonCommand: "onBackButtonCommand",
                deleteButtonCommand: "onDeleteButtonCommand",
            },
            passwordeditor: {
                savePasswordCommand: "onSavePasswordCommand",
                backButtonCommand: "onBackButtonCommand",
                 deleteButtonCommand: "onDeletePassButtonCommand",              
            },
            'passwordeditor  #btnsave': { tap: 'passwordsave' },
            'passwordeditor  #btndelete': { tap: 'passworddelete' },

            passwordview: {
                newPasswordCommand: "onNewPasswordCommand",
                editPasswordCommand: "onEditPasswordCommand",
                show: 'loadpasswordview'
            }
        },
        routes: {
            ':viewtype': 'navigateToView'
        }
    },
    //......Save pass
    passwordsave: function (form) {
        console.log("onpasssaveCommand");
        console.log(Ext.getCmp('passwordeditortitle'));
        console.log(Ext.getCmp('passwordeditortitle').getValue());
        var title = Ext.getCmp('passwordeditortitle').getValue();
        var narrative = Ext.getCmp('passwordeditornarrative').getValue();
        var passwordEditor = this.getPasswordeditor();
        var currentPassword = Ext.create("NotesandPasswords.model.Passwordmodel"); 

        // Update the current pass fields with form values.
        currentPassword.set("title", title);
        currentPassword.set("narrative", narrative);
          //validation
           var errors = currentPassword.validate();
           if (!errors.isValid()) {
               Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
               currentPassword.reject();
               return;
           }
   /*
           var notesStore = Ext.getStore("Notesstore");
           if (null == notesStore.findRecord('id', currentNote.data.id)) {
               notesStore.add(currentNote);
           }  */
        var passwordStore = Ext.getStore("Passwordstore");
        passwordStore.add(currentPassword);
        currentPassword.save();
        passwordStore.sync();
        passwordStore.sort([{ property: 'dateCreated', direction: 'DESC' }]);
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
            side: 'left'
        });
        var newView = Ext.create('widget.passwordview');
        main.push(newView);
        Ext.getStore("Passwordstore").sync();
        Ext.getStore("Passwordstore").load();
        console.log("Store Count " + Ext.getStore("Passwordstore").getCount());
        this.activatePasswordList();
    },  
      
    // disclose - pass list
    showpasswordeditor: function (list, record) {     
        // alert(event.target.id);  
        // console.log(list);
        //  console.log(record);
        Ext.Viewport.animateActiveItem({
            xtype: 'passwordeditor',
            data: record.getData()
        }, {
                type: "slide",
                direction: "left"
            });
        var data = record.getData();
        console.log(data);
        // var dataTitle= record.getData((this.id).get('title'));
        //..    var dataTitle= record.getData(title);
        //..    var dataNarrative= record.getData(narrative);
        // var dataTitle=record.notesstore.data.getAt(this.id).data.title;
        //  var dataNarrative=record.notesstore.data.getAt(this.id).data.narrative;
        //..   console.log(dataTitle);
        //..  console.log(dataNarrative);
        Ext.getCmp('passwordeditortitle').setValue(data.title);
        Ext.getCmp('passwordeditornarrative').setValue(data.narrative);
    }, 
    //go to pass editor
    gotopasseditor: function () {
        this.getApplication().redirectTo('passwordeditor');
    },
    // Delete button - notes edit
    /*  notedelete: function () {
          console.log("onDeleteNoteCommand");
          var noteEditor = this.getNoteEditor();
          var currentNote = noteEditor.getRecord();
          var notesStore = Ext.getStore("Notesstore");
          notesStore.remove(currentNote);
          notesStore.sync();
          this.activateNotesList();
          
          main = Ext.create('widget.main', {});
          Ext.Viewport.setActiveItem(main);
          Ext.Viewport.setMenu(Ext.create('widget.navview'), {
              side: 'left'
          });
          var newView = Ext.create('widget.notesview');
           main.push(newView);
           Ext.getStore("Notesstore").sync();
           Ext.getStore("Notesstore").load();         
           console.log("Store Count "+  Ext.getStore("Notesstore").getCount());        
          this.activateNotesList();
      },  */
    
    
    //....delete note
    notedelete: function (form) {
        console.log("onDeleteNote");
        var noteEditor = this.getNoteeditor();
        console.log(noteEditor);// returns data
        var currentNote = noteEditor.getData();
        console.log("currentnote");
        console.log(currentNote); // getRecord > null - getData > value
        var notesStore = Ext.getStore("Notesstore");
        console.log("notesStore");
        console.log(notesStore);//returns data
         notesStore.remove(notesStore.findRecord(currentNote));
         notesStore.sync();
       main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
           side: 'left'
        });
        var newView = Ext.create('widget.notesview');
        main.push(newView); 
        Ext.getStore("Notesstore").sync();
        Ext.getStore("Notesstore").load();
        console.log("Store Count " + Ext.getStore("Notesstore").getCount());
        this.activateNotesList();
    },
     //....delete pass
    passworddelete: function (form) {
        console.log("onDeleteNote");
        var passwordEditor = this.getPasswordeditor();
        console.log(passwordEditor);// returns data
        var currentPassword = passwordEditor.getData();
        console.log("currentpassword");
        console.log(currentPassword); // getRecord > null - getData > value
        var passwordStore = Ext.getStore("Passwordstore");
        console.log("passwordStore");
        console.log(passwordStore);//returns data
         passwordStore.remove(passwordStore.findRecord(currentPassword));
         passwordStore.sync();
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
           side: 'left'
        });
        var newView = Ext.create('widget.passwordview');
        main.push(newView);
        Ext.getStore("Passwordstore").sync();
        Ext.getStore("Passwordstore").load();
        console.log("Store Count " + Ext.getStore("Passwordstore").getCount());
        this.activatePasswordList();
    },
    // Disclose button action 
    shownoteeditor: function (list, record) {   
        // alert(event.target.id);  
        // console.log(list);
        //  console.log(record);
        
         main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
           side: 'left'
        });
        Ext.Viewport.animateActiveItem({
            xtype: 'noteeditor',
            data: record.getData()
        }, {
                type: "slide",
                direction: "left"
            });
        var data = record.getData();
        console.log(data);
        // var dataTitle= record.getData((this.id).get('title'));
        //..    var dataTitle= record.getData(title);
        //..    var dataNarrative= record.getData(narrative);
        // var dataTitle=record.notesstore.data.getAt(this.id).data.title;
        //  var dataNarrative=record.notesstore.data.getAt(this.id).data.narrative;
        //..   console.log(dataTitle);
        //..  console.log(dataNarrative);
        Ext.getCmp('noteeditortitle').setValue(data.title);
        Ext.getCmp('noteeditornarrative').setValue(data.narrative);
    },
    gotoeditor: function () {
        this.getApplication().redirectTo('noteeditor');
    },
    loadnotesview: function () {
        var notesStore = Ext.getStore("Notesstore").load();
        console.log(notesStore);
    }, 
    //load pass view
    loadpasswordview: function () {
        var passwordStore = Ext.getStore("Passwordstore").load();
        console.log(passwordStore);
    }, 
    // setting loginview as startup view     
    launch: function (e) {
        console.log(e);
        window.location.href = "#loginview";
        Ext.getStore("Notesstore").load();
        Ext.getStore("Passwordstore").load();
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    },
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {
        var noteEditor = this.getNoteeditor();
        noteEditor.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
    },
    gotolink: function () {
        this.getApplication().redirectTo('passwords');
    }, 
    // registration handling
    register: function () {
        var regname = Ext.getCmp('registerusername').getValue();
        console.log(regname);
        var regpass = Ext.getCmp('registerpassword').getValue();
        console.log(regpass);
        localStorage.setItem('registerusername', regname);
        localStorage.setItem('registerpassword', regpass);
        // loading notesview
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
            side: 'left'
        });
        var newView = Ext.create('widget.notesview');
        main.push(newView);
        Ext.getStore("Notesstore").load();
        Ext.getStore("Passwordstore").load();
    }, 
    // loginview
    onlogintap: function () {
        var loginnamecheck = Ext.getCmp('loginname').getValue();
        var loginpasswordcheck = Ext.getCmp('loginpass').getValue();
        var regusername = localStorage.getItem('registerusername');
        var regpassword = localStorage.getItem('registerpassword');
        // credential checking
        if ((loginnamecheck === regusername) && (loginpasswordcheck === regpassword)) {
            // loading notesview    
            main = Ext.create('widget.main', {});
            Ext.Viewport.setActiveItem(main);
            Ext.Viewport.setMenu(Ext.create('widget.navview'), {
                side: 'left'
            });
            var newView = Ext.create('widget.notesview');
            main.push(newView);
        } else {   
            // loging in failed            
            /*    alert("Wrong user-name and/or password");
                var loginnamecheck = null;
                var loginpasswordcheck = null;
                Ext.getCmp('loginname').setValue(loginnamecheck);
                Ext.getCmp('loginpass').setValue(loginpasswordcheck); */
            main = Ext.create('widget.main', {});
            Ext.Viewport.setActiveItem(main);
            Ext.Viewport.setMenu(Ext.create('widget.navview'), {
                side: 'left'
            });
            var newView = Ext.create('widget.notesview');
            main.push(newView);
        }
    },        
    // navbar starting          
    navButtonTap: function (button, e, eOpts) {
        Ext.Viewport.hideMenu('left');
        this.getApplication().redirectTo(button.config.action);
    },        
    //setting action of navbar butns                                 
    shownotesview: function () {
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
            side: 'left'
        });
        var newView = Ext.create('widget.notesview');
        main.push(newView);
        Ext.getStore("Notesstore").load();
        Ext.getStore("Passwordstore").load();
    },    
    // passwordview
    showpasswordview: function () {
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
            side: 'left'
        });
        var newView = Ext.create('widget.passwordview');
        main.push(newView);
        Ext.getStore("Notesstore").load();
        Ext.getStore("Passwordstore").load();
    },     
    //registerview              
    showregisterpage: function () {
        Ext.Viewport.animateActiveItem({
            xtype: 'registerview'
        }, {
                type: "slide",
                direction: "right"
            });
    },
    // loginview - back frm registerview
    showloginpage: function () {
        Ext.Viewport.animateActiveItem({
            xtype: 'loginview'
        },
            {
                type: "slide",
                direction: "left"
            });
    },  
    // checking for loginview or other 2 views
    navigateToView: function (xtype) {
        if (xtype === 'loginview') {
            Ext.Viewport.animateActiveItem({
                xtype: 'loginview'
            });
        } else {
            main = Ext.create('widget.main', {});
            Ext.Viewport.setActiveItem(main);
            Ext.Viewport.setMenu(Ext.create('widget.navview'),
                {
                    side: 'left'
                });
            var newView = Ext.create('widget.' + xtype);
            main.push(newView);
            Ext.getStore("Notesstore").load();
            Ext.getStore("Passwordstore").load();
        }
    },
    //........ handling data in notesview
    onNewNoteCommand: function () {
        console.log("onNewNoteCommand");
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        var newNote = Ext.create("NotesandPasswords.model.Notesmodel", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: "",
        });
        newNote.save();
        this.activateNoteEditor(newNote);
    },
    // handling list in notes view
    onEditNoteCommand: function (list, record) {
        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);
    },
    //........ handling data in passwordview
    onNewPasswordCommand: function () {
        console.log("onNewPasswordCommand");
        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        var newNote = Ext.create("NotesandPasswords.model.Passwordmodel", {
            id: passwordId,
            dateCreated: now,
            title: "",
            narrative: "",

        });
        newPassword.save();
        this.activatePasswordEditor(newPassword);
    },
    // handling list in pass view
    onEditPasswordCommand: function (list, record) {
        console.log("onEditNoteCommand");
        this.activateNoteEditor(record);
    },
    
    //......Save note
    notesave: function (form) {
        console.log("onSaveNoteCommand");
        console.log(Ext.getCmp('noteeditortitle'));
        console.log(Ext.getCmp('noteeditortitle').getValue());
        var title = Ext.getCmp('noteeditortitle').getValue();
        var narrative = Ext.getCmp('noteeditornarrative').getValue();
        var noteEditor = this.getNoteeditor();
        var currentNote = Ext.create("NotesandPasswords.model.Notesmodel");      
        // Update the current note's fields with form values.
        currentNote.set("title", title);
        currentNote.set("narrative", narrative);
        // validation
        var errors = currentNote.validate();
        console.log(errors.isValid());
        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentNote.reject();
            return;
        }       
        //   var notesStore = Ext.getStore("Notesstore");
        //    if (null == notesStore.findRecord('id', currentNote.data.id)) {
        //    notesStore.add(currentNote);
        //    }
        var notesStore = Ext.getStore("Notesstore");
        notesStore.add(currentNote);
        currentNote.save();
        notesStore.sync();
        notesStore.sort([{ property: 'dateCreated', direction: 'DESC' }]);
        main = Ext.create('widget.main', {});
        Ext.Viewport.setActiveItem(main);
        Ext.Viewport.setMenu(Ext.create('widget.navview'), {
            side: 'left'
        });
        var newView = Ext.create('widget.notesview');
        main.push(newView);
        Ext.getStore("Notesstore").sync();
        Ext.getStore("Notesstore").load();
        console.log("Store Count " + Ext.getStore("Notesstore").getCount());
        this.activateNotesList();
    },
    activatePasswordList: function () {
        Ext.Viewport.animateActiveItem(this.getPasswordview(), this.slideRightTransition);
        Ext.getStore("Passwordstore").load();
    },
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getNotesview(), this.slideRightTransition);
        Ext.getStore("Notesstore").load();
    },
  //  slideLeftTransition: { type: 'slide', direction: 'left' }
    //  onBackButtonCommand: function() {
    //  	Ext.Viewport.animateActiveItem(this.getNotesview(), this.slideRightTransition);
    //  },
    //  slideRightTransition: { type: 'slide', direction: 'right' },
    //...............
 
});