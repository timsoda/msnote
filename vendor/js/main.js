envolveNote();
addAutoResize();
var notesglobe;
var notesglobeCount = 0;
function addAutoResize() {
    document.querySelectorAll('[data-autoresize]').forEach(function (element) {
      element.style.boxSizing = 'border-box';
      var offset = element.offsetHeight - element.clientHeight;
      element.addEventListener('input', function (event) {
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + offset + 'px';
      });
      element.removeAttribute('data-autoresize');
    });
  }
  
  var createoggle = 0;
  document.getElementById("createfrm").addEventListener("click", function() {
    if(createoggle == 0){
        clrFormsA();
      document.getElementById("formDiv").style.display = "block";
      document.getElementById("createfrm").innerHTML = "Hide Form";
      createoggle = createoggle +  1;
    }else{
        clrFormsA();
      document.getElementById("formDiv").style.display = "none";
      document.getElementById("createfrm").innerHTML = "Create";
      createoggle = createoggle -  1;
    }
  });
function clrFormsA(){
    document.getElementById("myeForm").reset();
    document.getElementById("title_err").innerHTML = "";
	document.getElementById("notes_err").innerHTML = "";
}
document.getElementById("gosubm").addEventListener("click", function(event) { 
event.preventDefault();
var title  = document.myeForm.title.value;	
var notes  = document.myeForm.notes.value;	
var fmrate  = document.myeForm.fmrate.value; 

if(myTrim(fmrate) == "up8"){
    var frmudt  = document.myeForm.frmudt.value; 
    var title_err = notes_err = fmrate_err = frmudt_err = true; 
    if(myTrim(frmudt) > 0) {
        frmudt_err = false;
    } 
}else{
    var title_err = notes_err = fmrate_err = true; 
}

    // Validate title
    if(myTrim(title) == "") {
    printError("title_err", "<i class='fas fa-window-close'></i> This field cannot be empty");
} else {
    // Check if its lesser than 0
    if(myTrim(title).length < 2) {
        printError("title_err", "<i class='fas fa-window-close'></i> This field cannot be empty.");
    } else{
        printError("title_err", "");
        title_err = false;
    }
}
    // Validate notes
    if(myTrim(notes) == "") {
    printError("notes_err", "<i class='fas fa-window-close'></i> This field cannot be empty");
} else {
    // Check if its lesser than 0
    if(myTrim(notes).length < 2) {
        printError("notes_err", "<i class='fas fa-window-close'></i> This field cannot be empty.");
    } else{
        printError("notes_err", "");
        notes_err = false;
    }
}
    // Validate fmrate
if(myTrim(fmrate) == "cr8" || myTrim(fmrate) == "up8") {
    // printError("fmrate_err", "");
    fmrate_err = false;
} 

    // Prevent the form from being submitted if there are any errors
    if(myTrim(fmrate) == "up8"){
        if ((title_err || notes_err || fmrate_err || frmudt_err) == true) {
            return false;
        } else {
            cerUpte();
        }
    }else{
        if ((title_err || notes_err || fmrate_err) == true) {
            return false;
        } else {
            cerUpte();
        }
    }

});
function cerUpte(){
	var title  = document.getElementById("title").value;	
	var notes  = document.getElementById("notes").value;	
    var fmrate  = document.getElementById("fmrate").value;	
    document.getElementById("spsubm").style.display = 'block';
    document.getElementById("gosubm").style.display = 'none';	

    if(fmrate == "up8"){
        var frmudt  = document.getElementById("frmudt").value;
        $.ajax({
            type: "POST",
            url: "../app", 
            dataType: "json",
            data: {title: title, notes: notes, fmrate: fmrate, frmudt:frmudt},
            success: function(updeData){
            var slf = updeData;
            if(slf.ErrorNote == "none"){
                document.getElementById("msg1").classList.add("text-success");
                document.getElementById("msg1").innerHTML = 'Your Note has been Updated successfully';
                 $("#subMsg").modal('show');	
                 envolveNote();
                 setTimeout(() =>{
                    backButton();
                  }, 2000);
            }else{
                document.getElementById("gosubm").style.display = 'block';	
                document.getElementById("spsubm").style.display = 'none';
                document.getElementById("msg1").classList.add("text-danger");
                document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
                 $("#subMsg").modal('show');
            }
            } 
        });
        
    }else if(fmrate == "cr8"){
	$.ajax({
		type: "POST",
		url: "../app", 
		dataType: "json",
		data: {title: title, notes: notes, fmrate: fmrate},
		success: function(crteData){
		var slf = crteData;
		if(slf.ErrorNote == "none"){
            document.getElementById("msg1").classList.add("text-success");
            document.getElementById("msg1").innerHTML = 'Your Note has been added successfully';
             $("#subMsg").modal('show');	
             envolveNote();
             setTimeout(() =>{
                backButton();
              }, 2000);
        }else{
			document.getElementById("gosubm").style.display = 'block';	
            document.getElementById("spsubm").style.display = 'none';
            document.getElementById("msg1").classList.add("text-danger");
            document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
             $("#subMsg").modal('show');
        }
		} 
    });
} 
}
function envolveNote(){
    var mkl4o1lx3r7c25dk1354iyy7 = "mkl4o1lx3r7c25dk1354iyy7";
    $.ajax({
		type: "POST",
		url: "../app", 
		dataType: "json",
		data: {mkl4o1lx3r7c25dk1354iyy7: mkl4o1lx3r7c25dk1354iyy7},
		success: function(noteData){
            notesglobe = noteData;
            notesglobeCount = 1;
			
			var no = 1;
            var CST = "";
            CST += '<table id="tblnt" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary " style="width:100%">'+
            '<thead>'+
                '<tr>'+
                    '<th style="width:1%" scope="col">#</th>'+
                    '<th style="width:15%" scope="col">Title</th>'+
                    '<th style="width:10%" scope="col">Created</th>'+
                    '<th style="width:10%" scope="col">Last Update</th>'+
                    '<th style="width:10%" scope="col">Last IP</th>'+
                    '<th style="width:5%" scope="col">View</th>'+	
                    '<th style="width:5%" scope="col">Update</th>'+	
                    '<th style="width:5%" scope="col">Delete</th>'+	
                '</tr>'+
                '</thead>'+
                '<tbody >';	
            var NotePack = noteData;
            NotePack.forEach(function(item, index) {
            
                    CST +='<tr>';
                    //'<td>'+item.id+'</td>'+
					CST += '<td>';
					CST += no++;
					CST += '</td>';
                    CST += '<td>'+item.headings+'</td>'+
                    '<td>'+item.datecreated+'</td>'+
                    '<td>'+item.lastupdate+'</td>'+
                    '<td>'+item.lastip+'</td>'+
                    '<td> <button type="button" class="btn btn-primary" id="view'+item.id+'">View</button> </td>'+
                    '<td> <button type="button" class="btn btn-warning" id="edit'+item.id+'">Update</button> </td>'+
                    '<td> <button type="button" class="btn btn-danger" id="dele'+item.id+'">Delete</button> </td>'+
                    '</tr>';
                    
                });
                CST += '</tbody>'+
                '</table>';
                $("#listnotesh").html(CST);
                $("#tblnt").DataTable();

                NotePack.forEach(function(item, index) { 
                    $('#tblnt').on('click', '#view'+item.id+'', function(event) {
                      var Ixnt = item.id;
                       noteviW(Ixnt);
                      });
                    });
                NotePack.forEach(function(item, index) { 
                    $('#tblnt').on('click', '#edit'+item.id+'', function(event) {
                        //console.log(item.id)
                        var Ixnt = item.id;
                        noteupD(Ixnt);
                        });
                    });
                NotePack.forEach(function(item, index) { 
                    $('#tblnt').on('click', '#dele'+item.id+'', function(event) {
                        //console.log(item.id)
                        var Ixnt = item.id;
                        notedeL(Ixnt);
                        });
                    });
		}
		 
	});
}
function noteviW(Ixnt){
    var nxts = notesglobe.filter(mitt => mitt.id == Ixnt); 
	var qid = nxts.map(bill => bill.id); 
	var headings = nxts.map(bill => bill.headings);
	var wriptups = nxts.map(bill => bill.wriptups.nl2br());
	var datecreated = nxts.map(bill => bill.datecreated);
	var createdip = nxts.map(bill => bill.createdip);
	var lastupdate = nxts.map(bill => bill.lastupdate);
    var lastip = nxts.map(bill => bill.lastip);
    
    //wriptups = wriptups.nl2br()
    JXT = '';
    JXT += `<p><button class="btn btn-warning" id="edit${qid}" onclick="noteupD(${qid})">Update</button>        
    <button class="btn btn-danger" id="dele${qid}" onclick="notedeL(${qid})">Delete</button></p>
    <table id="viewtable" class="table table-striped table-bordered">
    <tr><th>Title</th><td>${headings}</td></tr>
    <tr><th>Note</th><td>${wriptups}</td></tr>
    <tr><th>Date Created</th><td>${datecreated}</td></tr>
    <tr><th>Created Ip</th><td>${createdip}</td></tr>
    <tr><th>Last Update</th><td>${lastupdate}</td></tr>
    <tr><th>Last Ip</th><td>${lastip}<p id="rarg" style="display:none";>${qid}</p></td></tr>
    </table>
    <br>
    
<div class="col-centered">
    <select class="form-control col-6" name="plotme" id="plotme" onchange="plotmeSub()">
    <option value=""> </option>
    `;
    for( var i = 0; i < notesglobe.length; i++){ 
    
        if ( notesglobe[i].id == qid) { 
            notesglobe.splice(i, 1); 
            notesglobe.forEach(item => {
                JXT += `<option value="${item.id}">Replace ${item.headings}</option>`;
            });
        }
    }
    /*notesglobe.forEach(item => {
        
        JXT += `<option value="${item.id}">Replace ${item.headings}</option>`;
    });*/
    JXT += `</select>
    <div id="plotmeEr" class="help-block"></div>
    <div id="rargEr" class="help-block"></div>
    <button id="plotmeSub" onclick="submitPlotme()" class="btn btn-success" style="display:none;"><i class="fas fa-save"></i></button>
    <div class="spinner-grow text-success" id="plotmespin" style="display:none;">
					<span class="sr-only ">Loading...</span>
				</div>
    </div>
    <br><br>
    <button class="btn btn-danger" onclick="backButton()"><i class="fas fa-arrow-left"></i></button>`;
    $("#viewnotesh").html(JXT);
    document.getElementById("delenotesh").innerHTML = "";
    $("#listnotesh").hide();
    $("#formDiv").hide();
    $("#createfrm").hide();
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";

    
}
function plotmeSub() {
    document.getElementById("plotmeSub").style.display = "block";
}
function submitPlotme() {
        var plotme  = document.getElementById("plotme").value; 
        var rarg = document.getElementById("rarg").innerHTML;
        
        
        var plotmeEr = rargEr = true; 
        
            // Validate plotme
        if(myTrim(plotme) == "") {
            printError("plotmeEr", "<i class='fas fa-window-close'></i> Error! Refresh page 0");
        } else {
            var regex = /^[0-9]*$/;
            if(regex.test(plotme) === false) {
                printError("plotmeEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            }else if(myTrim(plotme).length < 0){
                printError("plotmeEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            } else if(myTrim(plotme).length > 12){
                printError("plotmeEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            } else{
                printError("plotmeEr", "");
                plotmeEr = false;
            }
        }
        
        if(myTrim(rarg) == "") {
            printError("rargEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
        } else {
            var regex = /^[0-9]*$/;
            if(regex.test(rarg) === false) {
                printError("rargEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            }else if(myTrim(rarg).length < 0){
                printError("rargEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            } else if(myTrim(rarg).length > 12){
                printError("rargEr", "<i class='fas fa-window-close'></i> Error! Refresh page");
            } else{
                printError("rargEr", "");
                rargEr = false;
            }
        } 
            // Prevent the form from being submitted if there are any errors
        if ((plotmeEr || rargEr) == true) {
           return false;
        } else {
            RearagePlotme();
        }
}
function RearagePlotme(){
		
	var plotme  = document.getElementById("plotme").value;
    var rarg = document.getElementById("rarg").innerHTML;
    document.getElementById("plotmeSub").style.display = "none";
    document.getElementById("plotmespin").style.display = "block";
	$.ajax({
		type: "POST",
		url: "../app", 
		dataType: "json",
		data: {plotme: plotme, rarg, rarg},
		success: function(data){
			
		var slf = data; //if json is datatype is available
		if(slf.ErrorNote == "none"){
            document.getElementById("msg1").classList.add("text-success");
            document.getElementById("msg1").innerHTML = 'Note re-aranged successfully';
             $("#subMsg").modal('show');	
             envolveNote();
             setTimeout(() =>{
                backButton();
              }, 2000);
        }else{
            document.getElementById("plotmeSub").style.display = "block";
            document.getElementById("plotmespin").style.display = "none";
            document.getElementById("msg1").classList.add("text-danger");
            document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
             $("#subMsg").modal('show');
        }
		} 
	});
}

function noteupD(Ixnt){
    var nxts = notesglobe.filter(mitt => mitt.id == Ixnt); 
	var qid = nxts.map(bill => bill.id); 
	var headings = nxts.map(bill => bill.headings);
    var wriptups = nxts.map(bill => bill.wriptups);
    
    document.getElementById("title").value = headings;	
	document.getElementById("notes").value = wriptups;	
    document.getElementById("fmrate").value = "up8";
    UDP = `<input type="hidden" id="frmudt" value="${qid}">`;
    $("#kiteid").html(UDP);
    document.getElementById("XenUD").innerHTML = `<button class="btn btn-primary" id="view${qid}" onclick="noteviW(${qid})">View</button>        
    <button class="btn btn-danger" id="dele${qid}" onclick="notedeL(${qid})">Delete</button>`;
    document.getElementById("XenB").innerHTML = '<button class="btn btn-danger" onclick="backButton()"><i class="fas fa-arrow-left"></i></button>';
    
    document.getElementById("viewnotesh").innerHTML = "";
    document.getElementById("delenotesh").innerHTML = "";
    $("#listnotesh").hide();
    $("#formDiv").show();
    $("#createfrm").hide();
}
function  notedeL(Ixnt){
    var nxts = notesglobe.filter(mitt => mitt.id == Ixnt); 
	var qid = nxts.map(bill => bill.id); 
    var headings = nxts.map(bill => bill.headings);

    COI = `<p><button class="btn btn-primary" id="view${qid}" onclick="noteviW(${qid})">View</button>        
    <button class="btn btn-warning" id="edit${qid}" onclick="noteupD(${qid})">Update</button></p>
    <p>DO YOU WANT TO DELETE</p>
    <table id="viewtable" class="table table-striped table-bordered">
    <tr><td>${headings} ?</td></tr>
    </table>
    <p><button class="btn btn-danger" id="yer${qid}" onclick="delen(${qid})">Yes</button>        
    <button class="btn btn-primary" onclick="backButton()">No</button></p>
    `;
    $("#delenotesh").html(COI);

    document.getElementById("viewnotesh").innerHTML = "";
    $("#listnotesh").hide();
    $("#formDiv").hide();
    $("#createfrm").hide();
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";
}
function delen(Ixnt){
    var selet = Ixnt;
            $.ajax({
                type: "POST",
                url: "../app",
                dataType: 'json',
                data: {selet: selet},
                success: function(deleteData){
                    var slf = deleteData;
                    if(slf.ErrorNote == "none"){
                        document.getElementById("msg1").classList.add("text-success");
                        document.getElementById("msg1").innerHTML = 'Your Note has been Delete';
                         $("#subMsg").modal('show');	
                         envolveNote();
                         setTimeout(() =>{
                            backButton();
                          }, 2000);
                    }else{
                        document.getElementById("msg1").classList.add("text-danger");
                        document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
                         $("#subMsg").modal('show');
                    }
                }
        });
}

function backButton(){
    clrFormsA()
    document.getElementById("viewnotesh").innerHTML = "";
    document.getElementById("delenotesh").innerHTML = "";
    
    
    $("#listnotesh").show();
    $("#formDiv").hide();
    $("#createfrm").show();
    document.getElementById("createfrm").innerHTML = "Create";
    document.getElementById("kiteid").innerHTML = "";
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";
    document.getElementById("gosubm").style.display = 'block';	
    document.getElementById("spsubm").style.display = 'none';
    document.getElementById("fmrate").value = "cr8";
}







  function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }
  
  String.prototype.nl2br = function(){
    return this.replace(/\n/g, "<br />");
}
  function printError(elemId, hintMsg) {
  document.getElementById(elemId).innerHTML = hintMsg;
  } 
