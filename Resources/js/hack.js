$( function( ){
   
    function padNumber( num ) {
        if ( num < 10 ){
            return "0" + num;
        }
        return num;
    }
   
    hack = {
        getMe : function(){
            return this;
        },
        groupId : 1,
        setGroupId :  function( groupId ){
            this.groupId = groupId;
        },
        init : function( ){
            
            
            if ( typeof( localStorage.currentSchedule) == undefined || localStorage.currentSchedule == "" ) { 
                
                var promise = new Promise( function (){
                    $.ajax({
                        url : "data/currentSchedule.php",
                        dataType : "html",
                        async : false,
                        success: function( msg ){
                            console.log( localStorage.currentSchedule );
                            localStorage.currentSchedule = msg;
                        },
                        error : function( msg ){
                            alert("Schedule Could not be downloaded at the moment. PLease try again later.")
                        }                        
                    })
                });
                
            }
            
            ///promise.then(function(){
            if ( typeof( localStorage.groupId ) != undefined ) {
                if ( localStorage.groupId > 0 && localStorage.groupId <= 7) {
                    this.setGroupId( localStorage.groupId );
                } else {
                    window.location.href = "setting.html";
                }
            } else {
                window.location.href = "setting.html";
            }
            
            var msg = JSON.parse( localStorage.currentSchedule );
            console.log( msg );
            var html = hack.renderScheduleHtml( msg[ this.groupId  ] );
            hack.feed( '.schedule-list', html );
            hack.runCountDown();
        //  })
            
            
        },
        
        changeMintesIntoHumanTime : function( minutes ){
            var minutes = this.parseDecimal( minutes );
            
            //console.log( minutes );
            if ( minutes > 0 || minutes < 1440 ) {
                var hr = ( (minutes  -  ( minutes % 60 )) / 60 );
                var min = minutes - ( hr * 60 );
            }
            return padNumber( hr ) + " : " + padNumber( min );
        },
        renderEndTime: function( minutes, duration ) {
            var minutes = this.parseDecimal( minutes );
            var duration = this.parseDecimal( duration );
            var totalMinutes = minutes + duration;
            //console.log( totalMinutes );
            return this.changeMintesIntoHumanTime( totalMinutes );
        }, 
        parseDecimal : function( dec ) {
            return parseInt( dec, 10 );
        },
        checkNotification : function( groupId ){
        
        },
        notify : function( time, message ) {
            
        },
        connect : function(){
        
        },
        select : function( groupId ) {
        
        },
        switchGroup : function( groupId ) {
            var msg = JSON.parse( localStorage.currentSchedule );
            var html = hack.renderScheduleHtml( msg[ groupId ] );
            hack.getMe().feed( '.schedule-list', html );

        },
        renderScheduleHtml : function( msg ){
            var html = "<ul>";
            $.each( msg, function( k, v ){
                html += "<li><div class='day-box'>" + k + "</div>";
                $.each( v, function( kk, vv ){
                    $.each( vv, function( kkk, vvv ){
                        html += "<div><p> " + hack.getMe().changeMintesIntoHumanTime( vvv.startTime );
                        html += " - " + hack.getMe().renderEndTime( vvv.startTime, vvv.duration ) + "</p></div>";
                    })
                })  
                html += "</li>";
            })
            html += "</ul>";
            return html;
        },
        savePreferences : function ( groupId, notificationStatus, timeFormat ) {
            localStorage.groupId = groupId;
            localStorage.notificationStatus = notificationStatus;
            localStorage.timeFormat = timeFormat;
        },
        feed : function( div , content ) {
            $(div).html( content );
        },
        ticktok : function() {
            
            var minute = parseInt( $("#min-box").text(), 10 );
            var hour = parseInt( $("#hr-box").text(), 10);
            var sec = parseInt( $("#sec-box").text(), 10 );
            
            $("#sec-box").text( (sec - 1) );
            var Esec = parseInt( $("#sec-box").text(), 10 );
            var Emin = parseInt( $("#min-box").text(), 10 );
            if ( Esec <= 0 ) {
                $("#min-box").text( padNumber( minute - 1 ) );
                $("#sec-box").text( 59 );
            }
            
            if ( Emin <= 0 ) {
                $("#hr-box").html( padNumber( hour -1 ) );
                $("#min-box").html( 59 );
            }
        },
        getHumanDay : function( num ){
            switch (num) {
                case 0 :
                    return "sun";
                    break;
                case 1 :
                    return "sun";
                    break;
                case 2 :
                    return "sun";
                    break;
                case 3 :
                    return "sun";
                    break;
                case 4 :
                    return "sun";
                    break;
                case 5 :
                    return "sun";
                    break;
                case 6 :
                    return "sun";
                    break;
                    
            }
        },
        runCountDown : function() {
            var currentSchedule = this.getCurrentSchedule( this.groupId );
            var today = new Date();
            var hr = today.getHours();
            var min = today.getMinutes();
            var date = today.getDay();
            var second = today.getSeconds();
            var remSecond = ( 60 -  this.parseDecimal( second ));
            var thisDay = this.getHumanDay( date );
            var thisMinute = ( this.parseDecimal( hr ) * 60 ) + this.parseDecimal( min ) ;
            var todaySchedule = currentSchedule[ thisDay ]; 
            var done = false;
            
            $.each( todaySchedule, function( kk, vv ) {
                $.each( vv, function( k, v ) {
                    
                    if ( !done ) {
                        var startTime = hack.getMe().parseDecimal ( v.startTime );
                        var endTime = hack.getMe().parseDecimal ( v.startTime ) + hack.getMe().parseDecimal ( v.duration );
                        
                        if ( thisMinute < startTime ) {
                            var totalRemMinute = ( startTime - thisMinute );
                            remHour = ( totalRemMinute - ( totalRemMinute % 60 ) ) / 60;
                            remMinute = totalRemMinute % 60;
                            done = true;
                        } else if( thisMinute > startTime && thisMinute < endTime ) {
                            console.log( thisMinute );
                            console.log( startTime );
                            console.log( endTime );
                            var totalRemMinute = ( thisMinute - startTime );
                            remHour = ( totalRemMinute - ( totalRemMinute % 60 ) ) / 60;
                            remMinute = totalRemMinute % 60;
                            done = true;
                        }
                    }
                })
                
            })
            
            $("#sec-box").html( padNumber( remSecond ));
            $("#min-box").html( padNumber( remMinute ));
            $("#hr-box").html( padNumber( remHour ));
               
            setInterval( function() {
                hack.getMe().ticktok()
            }, 1000 );
        }, 
        getCurrentSchedule : function( ){
            var currentSchedule = JSON.parse( localStorage.currentSchedule );
            return currentSchedule[ this.groupId ];
        },
        updateSchedule : function(){
            $.ajax({
                url : "data/newSchedule.php",
                success : function( msg ){
                    localStorage.currentSchedule = msg;
                    var schedule = JSON.parse( localStorage.currentSchedule );                    
                    var html = hack.renderScheduleHtml( schedule[ hack.getMe().groupId  ] );
                    hack.feed( '.schedule-list', html );
                    hack.runCountDown();
                }
            })
        }
    };


    $(".refresh").on("click", function(){
        hack.updateSchedule();
    })
    
    $(".power-btn").on("click", function() {
        var a = confirm( "Are you sure you want to shut down the computer? It will shut down in 10 seconds");
        
        if ( a ) {
            $.get('data/shutdown.php');
        }
        
    })
    
    $(".groupSelect").on("click", function(){
        var groupId = $(this).attr('rel');
        hack.switchGroup( groupId );
    })
    
    $("#savePreference").on("click", function(){
        var groupId = $("#groupId").val();
        var notificationStatus = $(".notificationStatus:checked").val();
        var timeFormat = $("#timeFormat").val();
        console.log( groupId );
        console.log( notificationStatus );
        console.log( timeFormat );
        hack.savePreferences( groupId, notificationStatus, timeFormat );
    })
})

