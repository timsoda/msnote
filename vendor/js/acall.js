$('.summernote').summernote({
	toolbar: [
		// [groupName, [list of button]]
		['style', ['bold', 'italic', 'underline', 'clear']],
		['font', ['strikethrough', 'superscript', 'subscript']],
		['fontsize', ['fontsize']],
		['color', ['color']],
		['para', ['ul', 'ol', 'paragraph']],
		['table', ['table']],
		['height', ['height']]
	  ]
});
var noteinfo = "";
var noteinfocount = 0;
ListFxNotes();
document.getElementById("subcen").addEventListener("click", function(event) { 
    event.preventDefault();
    var title  = document.ntForm.title.value;	
	var notes  = document.ntForm.notes.value;	
    //var lorder  = document.ntForm.lorder.value; 
    var fmnum  = document.ntForm.fmnum.value;  
    if(myTrim(fmnum) == "u88"){
        var updatenote  = document.ntForm.updatenote.value; 
        var titleNo = notesNo = fmnumNo = updatenoteNo = true; 
        if(myTrim(updatenote) > 0) {
            updatenoteNo = false;
        } 
    }else{
        var titleNo = notesNo = fmnumNo = true; 
    }
    
		// Validate title
		if(myTrim(title) == "") {
        printError("titleNo", "<i class='fas fa-window-close'></i> This field cannot be empty");
    } else {
        // Check if its lesser than 0
        if(myTrim(title).length < 0) {
            printError("titleNo", "<i class='fas fa-window-close'></i> This field cannot be empty.");
        } else{
            printError("titleNo", "");
            titleNo = false;
        }
    }
		// Validate notes
		if(myTrim(notes) == "") {
        printError("notesNo", "<i class='fas fa-window-close'></i> This field cannot be empty");
    } else {
        // Check if its lesser than 0
        if(myTrim(notes).length < 11) {
            printError("notesNo", "<i class='fas fa-window-close'></i> This field cannot be empty.");
        } else{
            printError("notesNo", "");
            notesNo = false;
        }
    }
	/*	// Validate lorder
		if(myTrim(lorder) == "") {
        printError("lorderNo", "<i class='fas fa-window-close'></i> This field cannot be empty");
    } else {
        // Check if its lesser than 0
        if(myTrim(lorder).length < 0) {
            printError("lorderNo", "<i class='fas fa-window-close'></i> This field cannot be empty.");
        } else{
            printError("lorderNo", "");
            lorderNo = false;
        }
    } */
    // Validate fmnum
		if(myTrim(fmnum) == "c88" || myTrim(fmnum) == "u88" ) {
          //printError("fmnum_err", "");
                fmnumNo = false;   
        } 
        // Prevent the form from being submitted if there are any errors
    if(myTrim(fmnum) == "u88"){
        if ((titleNo || notesNo || fmnumNo || updatenoteNo) == true) {
            return false;
         } else {
             ImateNote();
         } 
    }else{
        if ((titleNo || notesNo || fmnumNo) == true) {
            return false;
         } else {
             ImateNote();
         } 
    }
	
});

function ImateNote(){	
	var title  = document.getElementById("title").value;	
	var notes  = document.getElementById("notes").value;	
	//var lorder  = document.getElementById("lorder").value;
    var fmnum  = document.getElementById("fmnum").value;
    
   	document.getElementById("subcen").style.display = 'none';	
    document.getElementById("subsp").style.display = 'block';
    
    if(myTrim(fmnum) == "u88"){
        var updatenote  = document.getElementById("updatenote").value;
                
    $.ajax({
        type: "POST",
        url: "./application", 
        //dataType: "json",
        data: {title: title, notes: notes, fmnum: fmnum, updatenote: updatenote},
        success: function(createResponds){
        //var mdsd = createResponds;
        var mdsd = JSON.parse(createResponds);
        if(mdsd.EPasona == "none"){
            document.getElementById("msg1").classList.add("text-success");
            document.getElementById("msg1").innerHTML = 'Note Updated Succesfully';
            $("#MsgBd").modal('show');
            ListFxNotes();
            setTimeout(() =>{
                backButton();
              }, 2000);
        }else{
            document.getElementById("subcen").style.display = 'block';	
            document.getElementById("subsp").style.display = 'none';
            document.getElementById("msg1").classList.add("text-danger");
            document.getElementById("msg1").innerHTML = 'Error!<br>Check Your Form or Refresh the page';
            $("#MsgBd").modal('show');
        }
        } 
    });
    }else{
	$.ajax({
		type: "POST",
		url: "./application", 
		//dataType: "json",
		data: {title: title, notes: notes, fmnum: fmnum},
		success: function(createResponds){
        //var mdsd = createResponds;
        var mdsd = JSON.parse(createResponds);
		if(mdsd.EPasona == "none"){
			document.getElementById("msg1").classList.add("text-success");
			document.getElementById("msg1").innerHTML = 'Note Submited Succesfully';
            $("#MsgBd").modal('show');
            ListFxNotes();
            setTimeout(() =>{
                backButton();
              }, 2000);
        }else{
			document.getElementById("subcen").style.display = 'block';	
	        document.getElementById("subsp").style.display = 'none';
			document.getElementById("msg1").classList.add("text-danger");
			document.getElementById("msg1").innerHTML = 'Error!<br>Check Your Form or Refresh the page';
			$("#MsgBd").modal('show');
        }
		} 
    });
}
}
function ListFxNotes(){
    var suw9964z4bv5y6y53ci = "suw9964z4bv5y6y53ci";
    $.ajax({
        type: "POST",
        url: "./application",
        dataType: 'json',
        data: {suw9964z4bv5y6y53ci: suw9964z4bv5y6y53ci},
        success: function(notesResponds){
            noteinfo = notesResponds;
            noteinfocount = 1;
			var no = 1;
            var CST = "";
            CST += '<table id="notetable" cellspacing="24px" cellpadding="10px" class="display table table-head-bg-secondary " style="width:100%">'+
            '<thead>'+
                '<tr>'+
                    '<th style="width:2%" scope="col">#</th>'+
                    '<th style="width:15%" scope="col">title</th>'+
                    '<th style="width:10%" scope="col">Created & Update</th>'+
                    '<th style="width:10%" scope="col">Last IP</th>'+
                    '<th style="width:10%" scope="col">Order</th>'+
                    '<th style="width:10%" scope="col">Action</th>'+
                '</tr>'+
                '</thead>'+
                '<tbody >';	
            var noteCrane = notesResponds;
            noteCrane.forEach(function(item, index) {
            
                    CST +='<tr>';
                    //'<td>'+item.id+'</td>'+
					CST += '<td>';
					CST += no++;
					CST += '</td>'; 
                    CST += '<td>'+item.title+'</td>'+
                    '<td>'+item.cdate+' - '+item.lastupdate+'</td>'+
                    '<td >'+item.updateip+'</td>'+
                    '<td id="t'+item.id+'"> <input type="number" class="form-control col-sm-12" id="ti'+item.id+'" value="'+item.range+'" > <p id="tio'+item.id+'"></p> <p class="text-danger" id="tioEr'+item.id+'"></p> </td>'+
                    '<td><i class="fas fa-eye ntlk text-info" id="v'+item.id+'"></i>  <i class="fas fa-keyboard ntlk text-warning" id="u'+item.id+'"></i> <i class="fas fa-window-close ntlk text-danger" id="d'+item.id+'"></i></td>'+
                    '</tr>';  
                });
                CST += '</tbody>'+
                '</table>';
                $("#listnotes").html(CST);
                $("#notetable").DataTable();

                var myCheck = setInterval(noteTimer, 1000);
                function noteTimer() {
                if(noteinfocount == 1){
                    TopSettersGo() 
                    clearInterval(myCheck)
                }
                }

                noteCrane.forEach(function(item, index) { 
                    $('#notetable').on('click', '#v'+item.id+'', function(event) {
                      var nxnts = item.id;
                        ViewNoteNt(nxnts);
                      });
                    });
                noteCrane.forEach(function(item, index) { 
                    $('#notetable').on('click', '#u'+item.id+'', function(event) {
                        var nxnts = item.id;
                        EditNoteNt(nxnts);
                        });
                    });
                noteCrane.forEach(function(item, index) { 
                    $('#notetable').on('click', '#d'+item.id+'', function(event) {
                        var nxnts = item.id;
                        DelNoteNt(nxnts);
                        });
                    });
                noteCrane.forEach(function(item, index) { 
                    $('#notetable').on('keyup', '#t'+item.id+'', function(event) {
                        //console.log(item.range);
                        
                        var nrange = item.range;
                        var nrid = item.id;
                       // var nrid = 'ti'+item.id;
                        NoteOrderRange(nrange, nrid);
                        });
                    });
        }
    });
}
function TopSettersGo(){
    var pdid = noteinfo.filter(bill => bill.top == "yes").map(bill => bill.id);
    var range = noteinfo.filter(bill => bill.top == "yes").map(bill => bill.range);
    if(pdid.length > 0){ 
        document.getElementById('t'+pdid).innerHTML = `${range} <br><br><p id="rmt${pdid}"><i class="fas fa-check text-success"></i> <u class="ntlk" onClick="RemoveTop(${pdid})">Top</u></p>`;
    } else {  } 
}
function RemoveTop(nxnts){
    document.getElementById('rmt'+nxnts).innerHTML = `<i class="fas fa-times text-danger"></i> <u>Remove As top</u> <button class="btn btn-danger" onClick="RemoveTopYes(${nxnts})">yes</button> <button class="btn btn-secondary" onClick="RemoveTopNo(${nxnts})">No</button>`
}
function RemoveTopNo(nxnts){
    document.getElementById('rmt'+nxnts).innerHTML = `<i class="fas fa-check text-success"></i> <u class="ntlk" onClick="RemoveTop(${nxnts})">Top</u>`
}
function RemoveTopYes(nxnts){
    var remtop = nxnts;
            $.ajax({
                type: "POST",
                url: "./application",
                dataType: 'json',
                data: {remtop: remtop},
                success: function(removeTopResponse){
                    var slf = removeTopResponse;
                    if(slf.EPasona == "none"){
                        document.getElementById("msg1").classList.add("text-success");
                        document.getElementById("msg1").innerHTML = 'Your Note has been Delete';
                        $("#MsgBd").modal('show');
                        ListFxNotes();
                        setTimeout(() =>{
                            backButton();
                          }, 2000);
                    }else{
                        document.getElementById("msg1").classList.add("text-danger");
                        document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
                         $("#MsgBd").modal('show');
                    }
                }
        });
}
function ViewNoteNt(nxnts){
    var wilil = noteinfo.filter(mitt => mitt.id == nxnts); 
	var quid = wilil.map(bill => bill.id);
	var title = wilil.map(bill => bill.title);
	var note = wilil.map(bill => bill.note);
	var range = wilil.map(bill => bill.range);
	var cdate = wilil.map(bill => bill.cdate);
	var cip = wilil.map(bill => bill.cip);
	var lastupdate = wilil.map(bill => bill.lastupdate);
	var updateip = wilil.map(bill => bill.updateip);
    
    //wriptups = wriptups.nl2br()

    var JXT = `<p><button class="btn btn-warning" onclick="EditNoteNt(${quid})">Update</button>        
    <button class="btn btn-danger" onclick="DelNoteNt(${quid})">Delete</button></p>
    <table id="viewtable" class="table table-striped table-bordered">
    <tr><th>Title</th><td>${title}</td></tr>
    <tr><th>Note</th><td>${note}</td></tr>
    <tr><th>Order</th><td>${range}</td></tr>
    <tr><th>Date Created</th><td>${cdate}</td></tr>
    <tr><th>Created Ip</th><td>${cip}</td></tr>
    <tr><th>Last Update</th><td>${lastupdate}</td></tr>
    <tr><th>Last Ip</th><td>${updateip}</td></tr>
    </table>
    <div><p id="noterolltop"></p><br></div>
    <button class="btn btn-danger" onclick="backButton()"><i class="fas fa-arrow-left"></i></button>
    `;
    $("#viewnotes").html(JXT);
    var cloli = noteinfo.filter(elle => elle.top == "yes").map(elle => elle.id);
    if(cloli.length == 0){
        document.getElementById("noterolltop").innerHTML = `<div class="form-group col-sm-12"><input type="checkbox" id="topbox" onchange="handleChange(${quid})" name="topbox" value="yes"> <label for="topbox">Make Top</label></div>`;
    }
    document.getElementById("delenotes").innerHTML = "";
    $("#listnotes").hide();
    $("#formDiv").hide();
    $("#createfrm").hide();
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";
}
function EditNoteNt(nxnts){
    var notepro = noteinfo.filter(mitch => mitch.id == nxnts); 
	var noteid = notepro.map(jude => jude.id);
	var title = notepro.map(jude => jude.title);
	var notewrap = notepro.map(jude => jude.note);
    document.getElementById("title").value = title;
    document.getElementById("fmnum").value = "u88";
    document.getElementById("notetxt").innerHTML = '<textarea id="notes" name="notes" class="form-control"></textarea>';
    document.getElementById("notes").value = notewrap; 
	notesummersummer();
    document.getElementById("noterollid").innerHTML = `<input type="hidden" id="updatenote" value="${noteid}"> `;
    document.getElementById("XenB").innerHTML = '<button class="btn btn-danger" onclick="backButton()"><i class="fas fa-arrow-left"></i></button>';
    document.getElementById("XenUD").innerHTML = `<button class="btn btn-primary" onclick="ViewNoteNt(${noteid})">View</button>        
    <button class="btn btn-danger" onclick="DelNoteNt(${noteid})">Delete</button>`;
    document.getElementById("createfrm").style.display = "none";
    document.getElementById("formDiv").style.display = "block";
    document.getElementById("listnotes").style.display = "none";
    document.getElementById("viewnotes").innerHTML = "";
    document.getElementById("delenotes").innerHTML = "";
    document.getElementById("titleNo").innerHTML = "";
    document.getElementById("notesNo").innerHTML = "";
}
function DelNoteNt(nxnts){
    var notepro = noteinfo.filter(mitch => mitch.id == nxnts); 
	var noteid = notepro.map(jude => jude.id);
	var title = notepro.map(jude => jude.title);

    COI = `<p><button class="btn btn-primary"  onclick="ViewNoteNt(${noteid})">View</button>        
    <button class="btn btn-warning"  onclick="EditNoteNt(${noteid})">Update</button></p>
    <p>DO YOU WANT TO DELETE</p>
    <table id="viewtable" class="table table-striped table-bordered">
    <tr><td>${title} ?</td></tr>
    </table>
    <p><button class="btn btn-danger" id="yer${noteid}" onclick="delen(${noteid})">Yes</button>        
    <button class="btn btn-primary" onclick="backButton()">No</button></p>
    `;
    $("#delenotes").html(COI);

    document.getElementById("viewnotes").innerHTML = "";
    $("#listnotes").hide();
    $("#formDiv").hide();
    $("#createfrm").hide();
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";
}
function delen(nxnts){
    var selet = nxnts;
            $.ajax({
                type: "POST",
                url: "./application",
                dataType: 'json',
                data: {selet: selet},
                success: function(deleteData){
                    var slf = deleteData;
                    if(slf.EPasona == "none"){
                        document.getElementById("msg1").classList.add("text-success");
                        document.getElementById("msg1").innerHTML = 'Your Note has been Delete';
                        $("#MsgBd").modal('show');
                        ListFxNotes();
                        setTimeout(() =>{
                            backButton();
                          }, 2000);
                    }else{
                        document.getElementById("msg1").classList.add("text-danger");
                        document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
                         $("#MsgBd").modal('show');
                    }
                }
        });
}
function handleChange(nxnts){
    var topbox = document.getElementById("topbox");
    var topboxV = document.getElementById("topbox").value;
  if (topbox.checked == true){
    var litid = nxnts;
            $.ajax({
                type: "POST",
                url: "./application",
                dataType: 'json',
                data: {litid: litid},
                success: function(topResponds){
                    var slf = topResponds;
                    if(slf.EPasona == "none"){
                        document.getElementById("msg1").classList.add("text-success");
                        document.getElementById("msg1").innerHTML = 'You have set a top note';
                        $("#MsgBd").modal('show');
                        ListFxNotes();
                        setTimeout(() =>{
                            backButton();
                          }, 2000);
                    }else{
                        document.getElementById("msg1").classList.add("text-danger");
                        document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Check Your form and try again or Refresh the page!';
                         $("#MsgBd").modal('show');
                    }
                }
        });
  } else {
    //console.log("Not welleked")
    //console.log(topboxV)
  }
}
function NoteOrderRange(nrange, nrid){
    document.getElementById('tio'+nrid).innerHTML = `
    <button class="btn btn-success" onClick=smitorder(${nrid})><i class='fas fa-save'></i></button>
    <button class="btn btn-danger" onClick=smitorderCl(${nrid})> <i class='fas fa-window-close'></i> </button>
    `;
    //document.getElementById('t'+nrid).innerHTML = '<input type="text" class="form-control col-sm-12" id="ti'+nrid+'" value="'+nrange+'" >';
}
function smitorder(nrid){
    var mNorder = noteinfo.map(bill => bill.range).reduce((acc, bill) => Math.max(bill, acc));
    mNorder = mNorder;
    mNorderPO = mNorder + 1;
    var order = document.getElementById('ti'+nrid).value;
    var orderEr = document.getElementById('tioEr'+nrid);
    var orderErLoad = true;
    var regex = /^[0-9]+$/;
    if(myTrim(order).length < 1 || myTrim(order) < 1 || myTrim(order) > mNorder ){
        orderEr.innerHTML = "Wrong Order Number";
    }else if(regex.test(order) === false) {
        orderEr.innerHTML = "Must be a Number";
    }else{
    var pdid = noteinfo.filter(bill => bill.top == "yes").map(bill => bill.id);
    var TopRanger = noteinfo.filter(bill => bill.top == "yes").map(bill => bill.range);
    if(pdid.length > 0){ 
        if(myTrim(order) == TopRanger){ 
            orderEr.innerHTML = "Cannot be Top";
        }else{
            orderEr.innerHTML = "";
            orderErLoad = false;
            }
        }else{
            orderEr.innerHTML = "";
            orderErLoad = false;
        }
    }

    if ( orderErLoad == true) {
        return false;
     } else {
        smitorderSumit(nrid, order)
        document.getElementById('tio'+nrid).innerHTML =   `
        <div class="spinner-grow text-success">
        <span class="sr-only ">Loading...</span>
        </div>`;
     } 
}
function smitorderCl(nrid){
    var order = noteinfo.filter(bill => bill.id == nrid).map(bill => bill.range);
    document.getElementById('ti'+nrid).value = order;
    document.getElementById('tio'+nrid).innerHTML = "";
    document.getElementById('tioEr'+nrid).innerHTML = "";
}
function smitorderSumit(nrid, order){
    var orderrangeid = nrid;
    var orderrange = order;
            $.ajax({
                type: "POST",
                url: "./application",
                dataType: 'json',
                data: {orderrangeid: orderrangeid, orderrange: orderrange},
                success: function(OrderRangeResponds){
                    var slf = OrderRangeResponds;
                    if(slf.EPasona == "none"){
                        document.getElementById("msg1").classList.add("text-success");
                        document.getElementById("msg1").innerHTML = 'Note has been re-ordered';
                        $("#MsgBd").modal('show');
                        ListFxNotes();
                        setTimeout(() =>{
                            backButton();
                          }, 2000);
                    }else{
                        document.getElementById("msg1").classList.add("text-danger");
                        document.getElementById("msg1").innerHTML = 'Error Was Found.<br> Note not re-ordered!';
                         $("#MsgBd").modal('show');
                         ListFxNotes();
                         setTimeout(() =>{
                             backButton();
                           }, 2000);
                    }
                }
        });
}
function clrFormsA(){
    document.getElementById("ntForm").reset();
    document.getElementById("titleNo").innerHTML = "";
    document.getElementById("notesNo").innerHTML = "";
    document.getElementById("notetxt").innerHTML = '<textarea id="notes" name="notes" class="form-control"></textarea>';
    document.getElementById("notes").value = ""; 
    notesummersummer();
}
function backButton(){
    clrFormsA()
    document.getElementById("viewnotes").innerHTML = "";
    document.getElementById("delenotes").innerHTML = "";
    $("#listnotes").show();
    $("#formDiv").hide();
    $("#createfrm").show();
    document.getElementById("createfrm").innerHTML = "Create";
    document.getElementById("noterollid").innerHTML = "";
    document.getElementById("XenUD").innerHTML = "";
    document.getElementById("XenB").innerHTML = "";
    document.getElementById("subcen").style.display = 'block';	
    document.getElementById("subsp").style.display = 'none';
    document.getElementById("fmnum").value = "c88";
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
function notesummersummer(){
    $('#notes').summernote({
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['height', ['height']]
          ]
    });
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