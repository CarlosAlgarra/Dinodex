var displaybluelines = false;    
var displayredlines = false;
var displaygreenlines = false;


var spd = 1.5;          // starting travel speed (increases over time)  [range 1 - 6]

var stage = 0;

var movec = true;           // points c/d randomly moving
var moved = true;

var tx = 200;               // x/y for translate/rotate
var ty = 300;

var ax = -50-tx;           // x/y positions of the abcd points
var ay = 800-ty;
var bx = 450-tx;
var by = ay;
var cx = 200-tx;
var cy = 25-ty;
var dx = 670-tx;
var dy = cy;
var sina = 0;           // sin of angle a
var sinb = 0;           // sin of angle b
var k = 0;              // triangle area
var h = 0;              // height of horizontals

var sinc = 0;           // stroke increment for fading 

var hy = [];            // array of heights (red lines)
var hyidx = 0;          // index for hy array
var w = 0;              // width of triangle - used for tile display

var qx = [];            // quad (tile) x/y positions (corners)
var qy = [];
var qidx = 0;           // index for qx/qy arrays

var dfax = 0;           // denominator factors for speed of tile movement
var dfay = 0;
var dfbx = 0;
var tiledisplay = 0;    // alternate color indicator for tiles
var crossdisplay = 0;   // cross road color indicator
var denom = 0;          // denominator for speed
var bspd = 35;          // base speed (35?)

var spf = spd;          // speed runner action factor...

var ai = 0;             // actn qx/qy index
var h1 = -245;          // horizontal line 1
var h2 = -245;          // horizontal line 2
var rf = 0;             // rotation factor
var rt = false;         // right turn
var lt = false;         // left turn
var jmpcnt = 0;         // jump count
var jmpinc = 0;         // jump increment
var dckcnt = 0;         // duck count
var paus = false;       // pause
var caughtcnt = 0;      // caught count in actn 8
var caughtdsp = 0;      // caught display (swaying of feet)
var caughtinc = 1;      // caught display increment 
var missedcatch = false;

var tmp = 0;
var p1 = 0;             // four points of the intersection (clockwise)
var p2 = 0;
var p3 = 0;
var p4 = 0;

var actn = 0;           // 0 - nothing/straight
                        // 1 - left
                        // 2 - Tee
                        // 3 - right
                        // 4 - jump
                        // 5 - duck
                        // 6 - veer left
                        // 7 - veer right
                        // 8 - jump and catch

                        
var cnt = 0;            // cycle counter
var dst = 0;            // distance counter
var ocnt = 0;           // obstacle counter
var rx = 0;             // runner x position
var lcnt = 0;           // veer left count
var rcnt = 0;           // veer right count
var sf = 100;           // scale factor????
var sf2 = 100;          // scale factor 2
var mcx = 0;            // mouse click x/y ----- swipe -----
var mcy = 0;

var newcx = cx;         // new cx/cy/dx positions for moving c/d points
var newcy = cy;
var newdx = dx;
var cxadj = 0;          // adjustment factor for new cx/cy/dx points
var cyadj = 0;
var dxadj = 0;

var flyx = 0;           // 'flyer' x/y/increment
var flyy = 0;
var flyinc = 0;
var flyer = loadImage("space/octopus");

var coinf = 0;          // coin display factor...

var rr = 245;           // road rgb color fill and stroke 
var rg = 215; 
var rb = 169;
var sr = 110;           // stroke rgb color
var sg = 38; 
var sb = 0;

var gocnt = 250;        // game over counter for runner fade
var gameover = 0;       // game over indicator/reason...
var goreason = [" ","Ha Ha Ha, bad turn GAME OVER \n Click refresh to restart ","Ha Ha Ha Missed the turn GAME OVER \n Click refresh to restart ","Oops, missed the jump GAME OVER \n Click refresh to restart ","Jumped too soon GAME OVER \n Click refresh to restart ","Oops, missed the duck GAME OVER \n Click refresh to restart ","Ducked too soonGAME OVER \n Click refresh to restart ","Oops, you fell off GAME OVER \n Click refresh to restart "]; 

var initroad = function() {
    rf = 0;
    ai = 0;   
    h1 = -245;
    h2 = -245;
    ax = -50-tx;        
    ay = 800-ty;
    bx = 450-tx;
    by = ay;           
};

var movetiles = function() {
    if (!paus) {
        if (ay >= 800-ty) {
            dfax = ax - qx[14];
            dfay = ay - qy[14];
            dfbx = bx - qx[15];
            ax = qx[14];
            ay = qy[14];
            bx = qx[15];
            by = ay;
            tiledisplay +=1;
            denom = bspd; 
            
            if (ai <= 15) {
                if (stage === 1 || gameover > 0) {actn = 0;}
                else {
                    ocnt ++;                    
                    if (ocnt <= 3) {actn = floor(random(1,4));}  /////// 1,4
                    else {
                        if (ocnt < 6) {actn = 4;}
                        else {
                            if (ocnt < 8) {actn = 5;}  
                            else {
                                if (ocnt < 10) {actn = floor(random(6,8));}
                                else {actn = floor(random(1,9));}      // (1,9)
                            }
                        }
                    } 
                }
                
                if (actn === 8) {ai = 175;}
                else {ai = 115 + floor(random(7))*10;}             //ai=175 max
                crossdisplay = ((ai-5)/10 +tiledisplay)%2;
                
                if (spd < 2) {spd += 0.05;}     // increase speed over time
                else {spd += 0.03;}
                if (spd > 6) {spd = 6;}         // max speed = 6
                spf = (spd -1)/2 + 1;           //?
            } else {ai -= 10;}
        }
        if (gameover === 0) {       
            ax += spd*dfax/denom;
            ay += spd*dfay/denom;
            bx += spd*dfbx/denom;
            by = ay;
            denom -= bspd/26;  //???????
        }
    }    
};

var drawgrass = function(z) {
        noStroke();
        p1 = qx[z];
        p2 = qx[z+1];
        p3 = qx[z+11];
        p4 = qx[z+10];
        h1 = qy[z];
        h2 = qy[z+10]; 
        fill(48, 207, 48,200+h1/2);
        quad(p1,h1,p2,h1,p3,h2,p4,h2);
};

translate(tx,ty);
textAlign(CENTER,CENTER);
var draw = function() {
    
    if (stage === 0){

        stage = 1;
        initroad();
        
    } else {
        
    background(255, 255, 255);

    
    keyCode = 0;
    if (!paus) {
        cnt ++;
        if (stage === 2 && gameover === 0) {dst ++;}
    }
    
    fill(70, 0, 70);
    stroke(70, 0, 70);
    textSize(19);

    if (stage === 1) {
        noFill();
          background(214, 202, 75);
        rect(10-tx,10-ty,73,23,2);
        fill(245, 24, 245);
        textSize(16);
        
        text("Start fast",46-tx,21-ty);  
             text("     PLAY THIS AND\nVOTE UP.\nIF YOU DARE",55 -tx,167 -ty); 
        textSize(19);
        text("Click anywhere to begin",200-tx,58-ty);}
        textSize(33);
        fill(145, 56, 11);
            text("TEMPLE RUN",203 -tx,19 - ty);
    if (stage === 2) {
          background(114, 122, 21);
        text("Distance:  "+round(dst/100),75-tx,21-ty);
        if (gameover === 0) {
            noFill();
            if (paus) {fill(143, 139, 139,90);}
            rect(330-tx,10-ty,60,24,2);
            fill(70, 0, 70);
             
            textSize(17);
            text("Pause",360-tx,21-ty); 
           
            fill(34, 39, 186);
            if (ocnt < 3 && dst >20) { //200?
                text("Right or Left arrow to turn",200-tx,60-ty);
            }
            if (ocnt > 3 && ocnt < 7) {
                text("Up or Down arrow to jump or duck",200-tx,60-ty);
            }
            if (ocnt > 7 && ocnt < 9) {
                text("A or D key to veer left or right",200-tx,60-ty);
                  
            }
        }
    }

    
// ------------------------- rotation ----------------------    
    if (lt) {
        rf += 5*spd;
        if (rf >= 90) {
            lt = false;
            initroad();
            movetiles();
        }
    }    
    if (rt) {
        rf -= 56*spd;
        if (rf <= -90) {
            rt = false;
            initroad();
            movetiles();
        }
    }    
    if (rf !== 0) {rotate(rf);}      


    sinc = 0;
    hyidx = 0;
    
// ------ x will be each of the bottom line points --------------
    for (var x=(ax-(bx-ax)*16); x<(ax+(bx-ax)*6); x += (bx-ax)){
        
        if (displaygreenlines && x > (ax-(bx-ax)*4)) {
           stroke(1, 97, 1);
           line(cx,cy,x,ay);} 
        
// ------------ horizontal lines calculation and display -----------------        
        if (x < bx) {
            sina = (ay-dy)/dist(x,ay,dx,dy);
            sinb = (by-cy)/dist(bx,by,cx,cy); 
            k = (bx-x)*(bx-x)*sina*sinb / (2 * sin(180-asin(sina)-asin(sinb)));
            h = 2*k/(bx-x);
            if (displayredlines) {
                sinc += 14;
                stroke(255, 0, 0,sinc);    
                line(0-tx,ay-h,400-tx,ay-h);
            }
            hy[hyidx] = h;
            hyidx ++;
        }
    }
    if (displayredlines) {
        stroke(255, 0, 0);
        line(0-tx,ay,400-tx,ay);}
    hy[17] = 0; // bottom line
    
    if (displaybluelines) {
        for (var m=-6; m<49; m++) {
            stroke(0, 0, 150+m*10,120-m*4);
            line(dx,dy,ax-m*(bx-ax),ay);}}
        
// --------------- determine corners of each tile ---------------
    qidx = 0;
    for (var x=(ax-(bx-ax)*4); x<=(ax+(bx-ax)*5); x += (bx-ax)){
        qx[qidx] = x;
        qy[qidx] = ay;
        sina = (ay-cy)/dist(x,ay,cx,cy);
        for (var z=1; z<=17; z++) {
            w = hy[17-z]/tan(asin(sina));
            if (x < cx) {qx[qidx+10*z] = x+w;} 
            else {qx[qidx+10*z] = x-w;}
            qy[qidx+10*z] = qy[qidx]-hy[17-z];
        }
        qidx ++;
    }
    qidx = tiledisplay;
    strokeWeight(1);
    
    
        
//----------------------- display grass? ----------------------  

//    noStroke();
//    for (var z=3; z<=158; z+=1) {drawgrass(z);}
   
    if (actn === 5) {
        for (var z=ai-30; z<=ai; z += 10) {
            drawgrass(z);
            drawgrass(z-2);
        }
        drawgrass(ai-9);
        drawgrass(ai-13);
        drawgrass(ai-19);
        drawgrass(ai-23);
    }
         
    
        
// -------------------- display tiles -------------------------

    if (gameover !== 1) {
    
    for (var z=4; z<=168; z+=10) {
        noStroke();
        if (qidx%2 === 0) {
            fill(rr, rg, rb);}else {fill(rr-9, rg-9, rb-9);}      //??
            
        p1 = qx[z];
        p2 = qx[z+1];
        p3 = qx[z+11];
        p4 = qx[z+10];
        h1 = qy[z];
        h2 = qy[z+10];
            
        if (actn === 6) {
            if (z < ai-41 || z > ai-9) {
                quad(p1,h1,p2,h1,p3,h2,p4,h2);  
                stroke(sr, sg, sb,255-z*1.2);
                line(p2,h1,p3,h2);
                line(p1,h1,p4,h2);
            } else {
                if (z === ai-41) {
                    quad(p1,h1,p2,h1,p4+(p3-p4)/2.5,h2,p4,h2); 
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p2,h1,p4+(p3-p4)/2.5,h2);
                    line(p1,h1,p4,h2);
                    if (rx >= 0 && h2 > 15 && gameover === 0) {gameover = 7;} 
                } else {
                if (z === ai-11) {
                    quad(p1,h1,p1+(p2-p1)/2.5,h1,p3,h2,p4,h2); 
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p1+(p2-p1)/2.5,h1,p3,h2);
                    line(p1,h1,p4,h2);
                    if (rx >= 0 && h1 < 40 && h1 > -10 && gameover === 0) {gameover = 7;}
                } else {                    
                    quad(p1,h1,p1+(p2-p1)/2.5,h1,p4+(p3-p4)/2.5,h2,p4,h2);
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p1+(p2-p1)/2.5,h1,p4+(p3-p4)/2.5,h2);
                    line(p1,h1,p4,h2);
                  }
                } 
            }
        } else {
            
        if (actn === 7) {
            if (z < ai-41 || z > ai-9) {
                quad(p1,h1,p2,h1,p3,h2,p4,h2); 
                stroke(sr, sg, sb,255-z*1.2);
                line(p2,h1,p3,h2);
                line(p1,h1,p4,h2);

            } else {
                if (z === ai-41) {
                    quad(p1,h1,p2,h1,p3,h2,p3-(p3-p4)/2.5,h2);
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p2,h1,p3,h2);
                    line(p1,h1,p3-(p3-p4)/2.5,h2);
                    if (rx <= 0 && h2 > 15 && gameover === 0) {gameover = 7;} 
                } else {
                if (z === ai-11) {
                    quad(p2-(p2-p1)/2.5,h1,p2,h1,p3,h2,p4,h2);
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p2,h1,p3,h2);
                    line(p2-(p2-p1)/2.5,h1,p4,h2);
                    if (rx <= 0 && h1 < 40 && h1 > -10 && gameover === 0) {gameover = 7;}
                } else {                    
                   quad(p2-(p2-p1)/2.5,h1,p2,h1,p3,h2,p3-(p3-p4)/2.5,h2); 
                    stroke(sr, sg, sb,255-z*1.2);
                    line(p2,h1,p3,h2);
                    line(p2-(p2-p1)/2.5,h1,p3-(p3-p4)/2.5,h2);
                  }
                } 
            }
        } else {
            
        if (actn === 8) {
            if (z < ai-41 || z > ai-9) {
                quad(p1,h1,p2,h1,p3,h2,p4,h2); 
                stroke(sr, sg, sb,255-z*1.2);
                line(p2,h1,p3,h2);
                line(p1,h1,p4,h2);
                
            } 
        } else {
            
        if ((actn !== 1 && actn !== 2 && actn !== 3) || z < ai-20)  {
            if ((actn !==4 && actn !== 8) || z !== ai-11) {
                quad(p1,h1,p2,h1,p3,h2,p4,h2);
                stroke(sr, sg, sb,255-z*1.2);
                line(p2,h1,p3,h2);
                line(p1,h1,p4,h2);
            }
        }
        }
        }
        }
        qidx ++;
    } // for (var z=4;

        
//---------------------- actn ----------------------------

    h1 = qy[ai-10];
    h2 = qy[ai];
    p1 = qx[ai];
    p2 = qx[ai-10];
    p3 = qx[ai-11];
    p4 = qx[ai-1];

    if (crossdisplay%2 === 1) {
        fill(rr, rg, rb);}else {fill(rr-9, rg-9, rb-9);}      //??

    noStroke();
    if (actn === 1) {    
        quad(p1,h2,p2,h1,-390,h1,-390,h2);
        stroke(sr, sg, sb,255-ai*1.2);      
        line(-390,h1,p3,h1);
        line(-390,h2,p1,h2);
        line(p2,h1,p1,h2);
        stroke(sr, sg, sb,255-ai*3);      //?
        for (var a=-5; a<=-1; a++) {
            line(qx[ai+a],qy[ai+a],qx[ai+(a-10)],qy[ai+(a-10)]);            
        }
    }
    if (actn === 2) {    
        quad(390,h2,390,h1,-390,h1,-390,h2);
        stroke(sr, sg, sb,255-ai*1.2);      
        line(-390,h1,p3,h1);
        line(p2,h1,390,h1);
        line(-390,h2,390,h2);
        stroke(sr, sg, sb,255-ai*3);      //?
        for (var a=-5; a<=4; a++) {
            line(qx[ai+a],qy[ai+a],qx[ai+(a-10)],qy[ai+(a-10)]);            
        }
    }
    if (actn === 3) {  
        quad(390,h2,390,h1,p3,h1,p4,h2);
        stroke(sr, sg, sb,255-ai*1.2);      
        line(390,h1,p2,h1);
        line(390,h2,p4,h2);
        line(p3,h1,p4,h2);
        stroke(sr, sg, sb,255-ai*3);      //?
        for (var a = 0; a<=4; a++) {
            line(qx[ai+a],qy[ai+a],qx[ai+(a-10)],qy[ai+(a-10)]);  
        }
    }
    } // if (gameover !== 1)                    ?????????????????



//---------------------- runner failed? ------------------

    if (rf <= -60 && gameover === 0) {                      // -80?
        if (actn !== 2 && actn !== 3) {gameover = 1;}
        if (h1 < -80) {gameover = 1;}   //?        
    }

    if (rf >= 60 && gameover === 0) {                       // 80?
        if (actn !== 1 && actn !== 2) {gameover = 1;}
        if (h1 < -80) {gameover = 1;}   //?
    }

    if ((actn ===1 || actn === 2 || actn === 3) && h2 > 30 && h2 < 60 && gameover === 0) {
         gameover = 2;
    }

    if (actn === 4 && jmpcnt <= 0 && gameover === 0) {
        if (h1 > 25 && h1 < 60) {gameover = 3;} 
        else {if (h2 < 0 && h1 > 50) {gameover = 4;}}
    }

    if (actn === 5 && dckcnt <= 0 && gameover === 0) {
        if (h1 > -25 && h1 < 0) {gameover = 5;}
        else {if (h1 > 0 && h2 < 0) {gameover = 6;}}
    }
    
// actn 6,7 'runner failed' check is in 'display tiles' section

    if (actn === 8 && jmpcnt <= 0 && gameover === 0) {
        if (qy[ai-40] > 25 || missedcatch) {
            gameover = 3;}
    }

   
// --------------------- flyer action/display ------------------ 

    if (actn ===8 && ai === 105 && flyinc === 0) {
        flyx = -240;                                    //??
        flyy = -145;
        flyinc = 2*spf;
    }
    
    if (flyinc !== 0) {
        if (!paus && gameover === 0) {
            flyx += flyinc;
            if (flyx >= 70/spf && flyinc < 6*spd) {         //???????
                flyinc *= -1;
            }
        }
        image(flyer,flyx,flyy,90,90);
        if (flyx > -33 && caughtcnt > 0) {
            rx = flyx+25;
            if (jmpcnt >= 50 && jmpcnt <= 65) {
                stroke(0, 0, 0);
                strokeWeight(2);
                line(rx+4,-55,flyx+31,flyy+75);}
        } else {
        }
        if (jmpcnt <= 0 && caughtcnt <= 0 && flyinc < 0) {
            rx = 0;                     //??????
            flyinc = 6*spd;}   
        if (flyx > 210) {
            flyinc = 0;
        }
    }   
    

// ------------------------- runner display ----------------  

    if (lcnt > 0 && !paus && gameover === 0) {                 // A - veer left
        if (lcnt > 125) {rx -= 2*spf;}
        if (lcnt < 26) {rx += 2*spf;}
        lcnt -= 1*spf;
        if (lcnt < 0) {
            lcnt = 0;
            rx = 0;
        }
    }
    
    if (rcnt > 0 && !paus && gameover === 0) {                 // D - veer right
        if (rcnt > 125) {rx += 2*spf;}
        if (rcnt < 26) {rx -= 2*spf;}
        rcnt -= 1*spf;
        if (rcnt < 0) {
            rcnt = 0;
            rx = 0;
        }
    }

    fill(250, 5, 250);
    stroke(35, 1, 46);
    strokeWeight(2);

    if (gameover === 0) {
        
        
// ---------------jump and catch ----------------------        
    if (jmpcnt <= 0) {caughtcnt = 0;}
    if (actn === 8 && (jmpcnt > 50 && jmpcnt < 65) && caughtcnt <= 0) {
        if ((ai === 55 || ai === 65) && rx === 0) {                //?????
            caughtcnt = 70;
            caughtdsp = 0;
            caughtinc = -0.5;
        } else { missedcatch = true;}
    }
    if (caughtcnt >= 10) {
        line(rx-2,jmpinc,rx-5.5+caughtdsp,30+jmpinc);
        line(rx+2,jmpinc,rx+5.5+caughtdsp,30+jmpinc);
        ellipse(rx-5+caughtdsp,25+jmpinc,8,15);
        ellipse(rx+5+caughtdsp,25+jmpinc,8,15);
        ellipse(rx,-2+jmpinc,18,30);
        if (!paus) {
            caughtcnt -= spf;
            if (caughtdsp < -3 || caughtdsp > 3) {caughtinc *= -1;}
            caughtdsp += caughtinc;
        }
    }

            
    if (jmpcnt > 0 && caughtcnt <= 10) {
        line(rx-2,jmpinc,rx-5.5,30+jmpinc);
        line(rx+2,jmpinc,rx+5.5,30+jmpinc);
        ellipse(rx-5,25+jmpinc,8,15);
        ellipse(rx+5,25+jmpinc,8,15);
        ellipse(rx,-2+jmpinc,18,30);
        if (!paus) {
            if (jmpcnt > 65) {
                jmpinc -= 3*spf;} 
            else {
                if (jmpcnt < 50) {jmpinc += 1.5*spf;}}   
                jmpcnt -= 1.72*spf; //?
        }
    }


    if (dckcnt > 0) {       
        line(rx-10,5,rx-15,-2);
        line(rx-15,-2,rx-18,5);
        ellipse(rx-20,8,12,8);
        line(rx+10,5,rx+15,-2);
        line(rx+15,-2,rx+18,5);
        ellipse(rx+20,8,12,8);
        ellipse(rx,0,21,27);            
        if (!paus) {dckcnt -= 1.72*spf;}                    //? 
    }

    if (rf !== 0) {rotate(-rf*1.2);}

    if (jmpcnt <= 0 && dckcnt <= 0) {
        line(rx-2,0,rx-5.5,30);
        ellipse(rx-5,30-((spd*cnt)%10)/2,8,((spd*cnt)%10)*1.5);
        line(rx+2,0,rx+5.5,30);
        ellipse(rx+5,30-((spd*cnt+5)%10)/2,8,((spd*cnt+5)%10)*1.5);
        ellipse(rx,0,20,30);
    }
    } else {                    // gameover runner display
        gocnt -= 5;
        fill(250, 5, 250,gocnt);
        stroke(35, 1, 46,gocnt);
        line(rx-6,15,rx-8,23);
        ellipse(rx-12,28,11,8);
        line(rx+6,15,rx+8,23);
        ellipse(rx+12,28,11,8);
        ellipse(rx,2,21,27); 
    }
    

// --------------------- duck / overpass -----------------
    if (actn === 5) {
        sf = (p2-p3)/8;     
        sf2 = (h1-h2)/1.5;  
        fill(128, 125, 125);
        strokeWeight(1);
        stroke(51, 50, 50);
        quad(p1+sf*0.8,h2,p2+sf,h1,p3-sf,h1,p4-sf*0.8,h2);
        rect(p3-sf,h1,sf,sf2);
        rect(p2,h1,sf,sf2);
        quad(p3-sf,h1,p2+sf,h1,p2+sf,h1+sf/2,p3-sf,h1+sf/2);
    }


    if (movec && !paus) {
        if (dist(cx,cy,newcx,newcy) < 10) {
            newcx = random(-40,40);
            newcy = random(-300,-200);  
            cxadj = (newcx - cx)/300;
            cyadj = (newcy - cy)/300;
        } else {
            cx += cxadj;
            cy += cyadj;
            dy = cy;
        }
    }
    
    if (moved && !paus) {
        if (dist(dx,dy,newdx,dy) < 10) {
            newdx = random(400,800);
            dxadj = (newdx - dx)/500;
        } else {
            dx += dxadj;
        }
    }
    
    
    if (gameover > 0) {
        movec = false;
        moved = false;
        fill(69, 36, 1);
        textSize(20);
        text(goreason[gameover],200-tx,55-ty);
//        paus = true;
    }
 
// ---------------------- tile/road movement -------------    
    movetiles();
   
    
    } // if (stage === 0  else
};


// --------------------------------------------------------


var keyPressed = function() {
    if (jmpcnt <= 0 && dckcnt <= 0 && !paus && gameover === 0) {
        if (keyCode === 39 && !lt) {rt = true;}
        if (keyCode === 37 && !rt) {lt = true;}
        if (keyCode === UP) {
            jmpcnt = 90;
            jmpinc = 0;}
        if (keyCode === DOWN) {dckcnt = 90;}
        if (keyCode === 65 && lcnt === 0) {lcnt = 150;}
        if (keyCode === 68 && rcnt === 0) {rcnt = 150;}
    }
    if (keyCode === 16) {
        if (paus) {paus = false;} else {paus = true;}
    }
};

var mouseClicked = function() {
    if (stage === 1) {
        if (mouseX < 83 && mouseY < 35) {spd = 5;}
        stage = 2;
        initroad();
    }
    if (mouseX < 90 && mouseY > 300 && stage === 0) {
//        stage = 2;
        stage = 1;
        initroad();
    }
    if (mouseX > 330 && mouseY < 35 && stage === 2) {
        if (paus) {paus = false;} else {paus = true;}
    }
};

// ----- 'swipe' controls for mobile device ---------------

var mousePressed = function() {
    if (mcx === 0 && mcy === 0) {
        mcx = mouseX;
        mcy = mouseY;
    }
};

var mouseReleased = function() {
    if (dst > 10) {
        if ((mcx > 0 || mcy > 0) && cnt > 10 && !paus) {
            if (dist(mouseX,mouseY,mcx,mcy) > 20) {
                if (abs(mouseY-mcy) > abs(mouseX-mcx)){
                    if (mouseY > mcy) {dckcnt = 90;} 
                    else {jmpcnt = 90; jmpinc = 0;}
                }
                else {
                    if (mouseX > mcx) {rt = true;}
                    else {lt = true;}
                }
            } else {
                if (!paus && mouseY > 40) {
                    if (mouseX < 200 && lcnt === 0) {lcnt = 150;}
                    if (mouseX > 200 && rcnt === 0) {rcnt = 150;} 
                }
            }
        }
    } // 
    mcx = 0;
    mcy = 0;

};
