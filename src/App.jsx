

import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ─── SEED DATA START ──────────────────────────────────────────────────────────
const SEED_ITEMS = [
  {"id":"11662775795","name":"Current Values Too High","lead":"Haemin Kim","status":"Done by Friday","createdDate":"2026-04-02","completedDate":null,"weekCreated":14,"weekDone":null},
  {"id":"11633722488","name":"Returned E-Lights Investigated","lead":"Haemin Kim","status":"Done by Friday","createdDate":"2026-03-30","completedDate":null,"weekCreated":13,"weekDone":null},
  {"id":"11613127136","name":"Create guardrails for how Erlon flashes HEX-M & HEX-T","lead":"Emily Oh","status":"Stuck","createdDate":"2026-03-27","completedDate":null,"weekCreated":13,"weekDone":null},
  {"id":"11627909788","name":"Get UK green light for recessed kits","lead":"Haemin Kim","status":"Stuck","createdDate":"2026-03-30","completedDate":null,"weekCreated":13,"weekDone":null},
  {"id":"11627933588","name":"Send PO to Changrong for recessed kits","lead":"Haemin Kim","status":"Stuck","createdDate":"2026-03-30","completedDate":null,"weekCreated":13,"weekDone":null},
  {"id":"11680100831","name":"Share obstruction sensor housing with Jyoti for DFM report","lead":"Amir Chaudhary","status":"Stuck","createdDate":"2026-04-06","completedDate":null,"weekCreated":14,"weekDone":null},
  {"id":"11734583712","name":"Add device subtype to filters on dashboard","lead":"Christian De Abreu","status":"Stuck","createdDate":"2026-04-13","completedDate":null,"weekCreated":15,"weekDone":null},
  {"id":"11734280891","name":"HW-1 · Investigate HEX F064 image fragment transmission failure","lead":"Eric Zhang","status":"Stuck","createdDate":"2026-04-13","completedDate":null,"weekCreated":15,"weekDone":null},
  {"id":"11632731711","name":"ToF Firmware developed and tested","lead":"Nirav, Will Kadison","status":"Done","createdDate":"2026-03-30","completedDate":"2026-05-03","weekCreated":13,"weekDone":18},
  {"id":"11779469286","name":"Record loom for India team on release process","lead":"Christian De Abreu","status":"Done by Friday","createdDate":"2026-04-17","completedDate":null,"weekCreated":16,"weekDone":null},
  {"id":"11795682604","name":"Assemble & QA & Pack 70 units going live next week","lead":"Will Kadison","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-03","weekCreated":16,"weekDone":18},
  {"id":"11795633895","name":"Give 200 unit serials to moof","lead":"Will Kadison","status":"Done by Friday","createdDate":"2026-04-20","completedDate":null,"weekCreated":16,"weekDone":null},
  {"id":"11795731411","name":"Test varying transparencies cover","lead":"Amir Chaudhary","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-01","weekCreated":16,"weekDone":18},
  {"id":"11800123247","name":"Ship 200 more 90cm ToF cables","lead":"Amir Chaudhary","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-01","weekCreated":16,"weekDone":18},
  {"id":"11800758493","name":"FLHM-01 · Define Fulham onsite support scope and SLA for Northwell installs","lead":"Emily Oh","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-03","weekCreated":16,"weekDone":18},
  {"id":"11810535081","name":"run repeated tests with each test case to tune threshold","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-21","completedDate":"2026-05-01","weekCreated":17,"weekDone":18},
  {"id":"11855707694","name":"Board Layout Complete","lead":"Nirav","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-03","weekCreated":17,"weekDone":18},
  {"id":"11855708506","name":"Validation before manufacturing","lead":"Nirav","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-03","weekCreated":17,"weekDone":18},
  {"id":"11855776885","name":"Add blink + LoRa join functionality","lead":"Nirav","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-03","weekCreated":17,"weekDone":18},
  {"id":"11855719428","name":"Setup html page and routes for commands","lead":"Nirav","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-03","weekCreated":17,"weekDone":18},
  {"id":"11855776928","name":"Setup I2C protocol and initial tests","lead":"Nirav","status":"Done by Friday","createdDate":"2026-04-27","completedDate":null,"weekCreated":17,"weekDone":null},
  {"id":"11855840632","name":"Add Heartbeat on default duration","lead":"Nirav","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-03","weekCreated":17,"weekDone":18},
  {"id":"11855769237","name":"Setup AT command interface","lead":"Nirav","status":"Done by Friday","createdDate":"2026-04-27","completedDate":null,"weekCreated":17,"weekDone":null},
  {"id":"11857410944","name":"[SPIKE] Document Dragino clock drift behavior and SYNCTDC configuration guidance","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-01","weekCreated":17,"weekDone":18},
  {"id":"11857419068","name":"[SPIKE] Investigate and configure Dragino SYNCTDC interval for 2-day sync","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-01","weekCreated":17,"weekDone":18},
  {"id":"11857617486","name":"DS-09 · Test new gauge detection approach on staging for HEX-F","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-01","weekCreated":17,"weekDone":18},
  {"id":"11857672266","name":"create project road map for 7137 vs 7108 nylon","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-27","completedDate":"2026-05-01","weekCreated":17,"weekDone":18},
  {"id":"11857682715","name":"design SMD LED strip to reposition red wire","lead":"Kaushal Mahuvarkar","status":"Done by Friday","createdDate":"2026-04-27","completedDate":null,"weekCreated":17,"weekDone":null},
  {"id":"11870669637","name":"Review Rodrigo's tickets","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-28","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11878241676","name":"HF-01 · Collect resource links from Will — HEX-F","lead":"Christian De Abreu","status":"Done by Friday","createdDate":"2026-04-29","completedDate":null,"weekCreated":18,"weekDone":null},
  {"id":"11881558823","name":"[SPIKE] SMC-01 · Investigate Milesight auto-reset behavior for offline devices","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-29","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11883169710","name":"[SPIKE] SMC-03 · Coordinate Hex-T-S replacement ahead of cert expiry — St. Mary","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-29","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11883500666","name":"[SPIKE] SMC-02 · Hex-T-S comms outage — St. Mary Medical Center — Apr 10","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-29","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11893336774","name":"Confirm HEX-A-C sample availability + ETA with team — blocks UL shipment","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-30","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11893275536","name":"🚨 Respond to UL TAT letter — reactivate cert project","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-30","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11895881454","name":"Ask Claude to draft Tuesday UK meeting agenda and slide structure","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-30","completedDate":"2026-05-03","weekCreated":18,"weekDone":18},
  {"id":"11895881161","name":"Research junction box that fits client needs","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-30","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11900595420","name":"Find internal LED wattage of HEX-A-6 — needed to complete HEX-A-6 and HEX-A-6 recessed cutsheets","lead":"Haemin Kim","status":"Done","createdDate":"2026-05-01","completedDate":"2026-05-01","weekCreated":18,"weekDone":18},
  {"id":"11900719175","name":"Spec sheet — first pass draft (existing drawings, send to client for early feedback)","lead":"Haemin Kim","status":"Done","createdDate":"2026-05-01","completedDate":"2026-05-03","weekCreated":18,"weekDone":18},
  {"id":"11902690594","name":"Check fit of RACO 8189 + RACO 8753 against recessed kit device and plate — confirm which works before sending to UK","lead":"Haemin Kim","status":"Done by Friday","createdDate":"2026-05-01","completedDate":null,"weekCreated":18,"weekDone":null},
  {"id":"11903757846","name":"DB-03 · Build Claude-powered 9-section compatibility checker","lead":"Christian De Abreu","status":"Done","createdDate":"2026-05-01","completedDate":"2026-05-03","weekCreated":18,"weekDone":18},
  {"id":"11680008381","name":"Update HEX-F firmware with new ToF logic","lead":"Nirav","status":"Done","createdDate":"2026-04-06","completedDate":"2026-05-01","weekCreated":14,"weekDone":18},
  {"id":"11734514965","name":"Create clear demo separation process on dashboard admin","lead":"Omar Rizkallah","status":"Done","createdDate":"2026-04-13","completedDate":"2026-05-01","weekCreated":15,"weekDone":18},
  {"id":"11738876343","name":"Create HEX-T-ULT battery swap guide","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-13","completedDate":"2026-05-01","weekCreated":15,"weekDone":18},
  {"id":"11734378618","name":"Design HEX-C PCB with LSM303AGR sensor","lead":"Kaushal Mahuvarkar","status":"Done","createdDate":"2026-04-13","completedDate":"2026-05-01","weekCreated":15,"weekDone":18},
  {"id":"11734504828","name":"Teach / Present new workflow to produdct team","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-13","completedDate":"2026-05-01","weekCreated":15,"weekDone":18},
  {"id":"11797969157","name":"DS-08 · Deploy updated gauge detection approach to production","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-01","weekCreated":16,"weekDone":18},
  {"id":"11796528511","name":"Sticker on HEX-F 3-D Printed Enclosure","lead":"Will Kadison","status":"Done","createdDate":"2026-04-20","completedDate":"2026-05-03","weekCreated":16,"weekDone":18},
  {"id":"11585056720","name":"1,000 Images Added to Training Data","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-28","weekCreated":13,"weekDone":13},
  {"id":"11613062277","name":"3D Printable Enclosure for New ToF Designed and finished","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613062046","name":"[Alpha] version of firmware ready to validate sensor functionality with HEX-F firmware","lead":"Nirav","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585749307","name":"Add new wiring, test switch diagnostics to install guide","lead":"Emily Oh","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613052046","name":"Align Firmware Versions on Dashbaord with What Devices Actually Have","lead":"Emily Oh","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613027057","name":"Approve Kaushal to start designing Flat PCB","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613045394","name":"Check in with Shore Medical","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585767126","name":"Compare 2.8.20 \"upon join messages\" with 2.7.23","lead":"Emily Oh","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613064157","name":"Confirm MCS probes can be tested/reported on at Erlons","lead":"Emily Oh","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613003368","name":"Create HEX-F BOM","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11584739320","name":"Create process for new HEX-M India Cables","lead":"Emily Oh","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613047214","name":"Draft UL listing info sheet for Laura/Rodrigo","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613039413","name":"Final Draft of HEX-F Report Shared with Software","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585725420","name":"Get UK green light for light fixture","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585753458","name":"Have Dragino flash 2.7.23 for all future and current HEX-Ms","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613063684","name":"HEX-A-R variants","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585790943","name":"Label Training Data","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-28","weekCreated":13,"weekDone":13},
  {"id":"11613081008","name":"Let's get the recessed kit back from LIJ and shipped to UK","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613027121","name":"Make sure all Parts ordered","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613058631","name":"Meet with Milesight for Flat Probes","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613043031","name":"Message Dragino about lower temp threshold of probe and new firmware not resolved all spikers","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613003128","name":"New PCB Specs to Amir","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613006821","name":"Packaging Designed for HEX-F 5 units per box","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11585768381","name":"Retrain Classification Algorithm with Manual data","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-28","weekCreated":13,"weekDone":13},
  {"id":"11585762587","name":"Retrain Color Painting Algorithm with Manual Data","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-24","completedDate":"2026-03-28","weekCreated":13,"weekDone":13},
  {"id":"11613080683","name":"RIH Swinging Light Detection Interview","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613082457","name":"Send PO to Changrong for light fixtures","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-27","completedDate":"2026-04-13","weekCreated":13,"weekDone":15},
  {"id":"11613045587","name":"Ship Mei a HEX-T-C-S","lead":"Emily Oh","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613028507","name":"Ship new flashing cables","lead":"Kaushal Mahuvarkar","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613052098","name":"Sort out all questions","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613047548","name":"Test Milesight Probes/Buffer Bottles for expected behaviors","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613027405","name":"Train Erlon on manufacturing process","lead":"Emily Oh","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11613060597","name":"Train product team on critical odoo steps","lead":"Haley Theroux","status":"Done","createdDate":"2026-03-27","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11613007338","name":"Update QA software to include ToF sensor","lead":"Nirav","status":"Done","createdDate":"2026-03-27","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11613061671","name":"White Lines Image","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-28","weekCreated":13,"weekDone":13},
  {"id":"11613045713","name":"Work with Ibbs to coordinate demos","lead":"Will Kadison","status":"Done","createdDate":"2026-03-27","completedDate":"2026-03-27","weekCreated":13,"weekDone":13},
  {"id":"11632527833","name":"3-D Print All Components for 150 Units","lead":"Will Kadison","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11627359573","name":"Create formal approval process and flow","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11631856409","name":"Create install guide","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11631825596","name":"Create process for HEX-M Kickoff call with Electricians","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11627328267","name":"Create separate beta vs general release checklists","lead":"Christian De Abreu","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11639844611","name":"DC-1 · Capture and downsample new under_pressure images","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11639777727","name":"DC-2 · Annotate new images for classifier dataset","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11639793246","name":"DC-3 · Annotate new images for segmentation dataset","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11639800778","name":"DP-1 · Expand under_pressure classifier training set","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11639798109","name":"DP-2 · Expand segmentation training set","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11639809244","name":"EH-1 · Define and freeze the prod eval dataset","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11644747297","name":"EH-2 · Build Python model evaluation harness","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11644755654","name":"EH-3 · Run three-way model comparison and document results","lead":"Eric Zhang","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11632894028","name":"Flat Battery HEX-F Design Greenlight","lead":"Will Kadison","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11631793614","name":"Monitor warehouse testing for invalid battery voltage readings","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11632622537","name":"New HEX-F Cutsheet","lead":"Will Kadison","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11633671659","name":"Put together visual summary of lum test findings for haley omar","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11633675499","name":"Receive quote from UL / Place PO","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11640178413","name":"send 3d file for new enclosure and will print","lead":"Kaushal Mahuvarkar","status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11640166306","name":"send amir magnet link and jyoti dfm feedback on back enclosure","lead":null,"status":"Done","createdDate":"2026-03-31","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11633585340","name":"Software sync to learn how PCB types got labeled / revisited","lead":"Haemin Kim","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11633743270","name":"Test Dashboard Errors & Resolutions","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11656208384","name":"Test Dragino Sample Cables","lead":null,"status":"Done","createdDate":"2026-04-01","completedDate":"2026-04-06","weekCreated":14,"weekDone":14},
  {"id":"11627632010","name":"ToF  Sensor housing sent to Jyoti","lead":"Will Kadison","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-13","weekCreated":13,"weekDone":15},
  {"id":"11631727778","name":"Work with Haley to get support material on training site","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-13","weekCreated":13,"weekDone":15},
  {"id":"11632067051","name":"Work with Jacob to follow Sales Demo SOP","lead":"Emily Oh","status":"Done","createdDate":"2026-03-30","completedDate":"2026-04-06","weekCreated":13,"weekDone":14},
  {"id":"11680099468","name":"3-D Print new designs (camera enclosure ) from Jyoti","lead":"Amir Chaudhary","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11693668043","name":"Create display of all devices for UL visit next week","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-07","completedDate":"2026-04-13","weekCreated":15,"weekDone":15},
  {"id":"11679846694","name":"Deploy Updated model","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679850679","name":"DS-1 · Validate green zone color segmentation on prod images","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679895173","name":"DS-2 · Extend segmentation model to include green zone class","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679897399","name":"DS-3 · Build and tune overlap calculation logic","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679872361","name":"DS-4 · Integration test and cutover plan","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11680244925","name":"Follow up with St. Mary Install","lead":"Emily Oh","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11680212297","name":"Get final buy-in from team","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679791957","name":"Kick off HEX-M New FW","lead":"Emily Oh","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11680205869","name":"Quote review call with UL","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679983603","name":"Recreated shorted 7.5ohm board","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11700395564","name":"Respond to ray abt Bristol meeting","lead":"Will Kadison","status":"Done","createdDate":"2026-04-08","completedDate":"2026-04-13","weekCreated":15,"weekDone":15},
  {"id":"11689985892","name":"Send Amir and Kaushal Feedback on new HEX-F print","lead":"Will Kadison","status":"Done","createdDate":"2026-04-07","completedDate":"2026-04-13","weekCreated":15,"weekDone":15},
  {"id":"11690054659","name":"Send Amir and Kaushal Feedback on new HEX-F print","lead":"Will Kadison","status":"Done","createdDate":"2026-04-07","completedDate":"2026-04-13","weekCreated":15,"weekDone":15},
  {"id":"11704193360","name":"Sync with Dragino to make correct RJ12 cables","lead":"Nirav","status":"Done","createdDate":"2026-04-08","completedDate":"2026-04-13","weekCreated":15,"weekDone":15},
  {"id":"11680013886","name":"Test 8x8 windowing (python) and validate functionality","lead":"Will Kadison","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11679747354","name":"Train Erlon on updated HEX-M testing form","lead":"Emily Oh","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-13","weekCreated":14,"weekDone":15},
  {"id":"11704193160","name":"Perform 12W HEX-M Release Process Checklist","lead":"Emily Oh","status":"Done","createdDate":"2026-04-08","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11613030160","name":"Get cover sample from Jyoti with varying transparencies","lead":"Amir Chaudhary","status":"Done","createdDate":"2026-03-27","completedDate":"2026-04-20","weekCreated":13,"weekDone":16},
  {"id":"11700392886","name":"add raceways to install kits","lead":"Will Kadison","status":"Done","createdDate":"2026-04-08","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11680117843","name":"better weight logic for hex-f","lead":"Will Kadison","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-20","weekCreated":14,"weekDone":16},
  {"id":"11680297083","name":"Confirm/Reject sensors for future Anti Tampering","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-20","weekCreated":14,"weekDone":16},
  {"id":"11680080739","name":"Determine how/if we want to serialize the different sensors","lead":"Will Kadison","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-20","weekCreated":14,"weekDone":16},
  {"id":"11680296625","name":"First pass test the dual sensor","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-20","weekCreated":14,"weekDone":16},
  {"id":"11710933103","name":"Investigate why HEX-T-ULT battery died so fast","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-09","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11680066026","name":"Print and validate new enclosure in product office","lead":"Will Kadison","status":"Done","createdDate":"2026-04-06","completedDate":"2026-04-20","weekCreated":14,"weekDone":16},
  {"id":"11704280959","name":"Wrap Up Items","lead":"Emily Oh","status":"Done","createdDate":"2026-04-08","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11734544470","name":"Agreed to send prototypes / specs","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11747080122","name":"create AI generated image with fireproof cover for cables","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-14","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11734463779","name":"Create new monday board project","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11746281483","name":"DC-4 · Collect 100 in-pressure and under-pressure gauge images in office","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-14","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11734273021","name":"DS-5 · Surface needle confidence as platform confidence metric","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11734250047","name":"DS-6 · Define and build expanded test dataset for solution evaluation","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11734284217","name":"DS-7 · Coordinate Software/Platform approval and production release of ray-cast approach","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11738173207","name":"F022 Investigation - Bad Image","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11738096170","name":"Green light ToF Firmware dev to Nirav","lead":"Will Kadison","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11749935452","name":"have meeting with brandon to confirm POC","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-14","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11772424596","name":"HXM-01 · Collect resource links from Emily — HEX-M","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-16","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11772438674","name":"HXM-02 · Draft HEX-M wiki — all sections","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-16","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11770355972","name":"IM-01 · Add start/stop recording controls to IMU sensor monitor","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-16","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11738060999","name":"Make an Install Video for HEX-F","lead":"Will Kadison","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11734631520","name":"Mlonitoring of the hw issue spikers","lead":"Emily Oh","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11734330285","name":"Requirements for Testing / Setup","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11749940647","name":"Send PO to UL","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-14","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11738904319","name":"Spec reflashing kits for future orders","lead":"Emily Oh","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11733995815","name":"Test unshorted 7.5E threshold","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-13","completedDate":"2026-04-20","weekCreated":15,"weekDone":16},
  {"id":"11751132460","name":"Validate Self-Test QA workflows","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-14","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11795717252","name":"Send 3d model of shell out to vendors for samples","lead":"Amir Chaudhary","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-20","weekCreated":16,"weekDone":16},
  {"id":"11795806282","name":"Packaging delivered","lead":"Will Kadison","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11795546456","name":"Self-Test Hook Logic Resolved","lead":"Nirav","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800155907","name":"Ship HEX-F sticker samples to test on 3D prints","lead":"Edwin Gonsalves","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800727769","name":"Spec HEX-M in-house business spec","lead":"Emily Oh","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800718045","name":"DB-01 · Build fixture cutsheet database from scratch","lead":"Emily Oh","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800825393","name":"[SPIKE] HM-01 · Investigate newly installed Hex-M units failing at Northwell & NYU","lead":"Emily Oh","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800833234","name":"[SPIKE] ALH-02 · Diagnose LoRa uplink transmission not received at gateway for T6W3 and T7JD","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11800807859","name":"[SPIKE] ALH-01 · Investigate measurement gaps across Arizona Liver Health devices","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-20","completedDate":"2026-04-24","weekCreated":16,"weekDone":17},
  {"id":"11807282014","name":"Ensure we have 75 magnetized camera boxes and gauge clamp arms","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11807218266","name":"3D print more protective camera arms","lead":"Will Kadison","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11807245132","name":"[SPIKE SUPPORT] QA 85 smart hooks- 40 20lb, 30 5lb, 15 10lb","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11807387663","name":"make sure 75 flahsed and built Camera Assemblys","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11809841881","name":"[SPIKE] Create Training Video — Temperature Monitors with Screens","lead":"Emily Oh","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810535680","name":"remake exit sign to have sensor on correct position","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810574172","name":"Develop damp temperature ranges","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810716255","name":"Place PO for 10 recessed kits","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810846410","name":"Meeting with Changrong about nylon solution","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810852072","name":"DB-02 · Define cutsheet database fields (fixture type, wattage, dimming, voltage, driver)","lead":"Emily Oh","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11810796580","name":"SW - 01 Revisit and review current dashboard software logic","lead":"Emily Oh","status":"Done","createdDate":"2026-04-21","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11817866472","name":"Setup dev env. & board","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11818020312","name":"Place order for 10x red and 10x green 22 LED strips","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11818952925","name":"Initial Draft Schematics","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11818937895","name":"Finalizing Schematics","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11818959941","name":"Component Sourcing","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11819047755","name":"Setup wifi capabilities","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11819053356","name":"Remove Everything (maintain compilation)","lead":"Nirav","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11821385751","name":"[SPIKE] FW-01 · Draft high-level firmware requirements doc for Nirav","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11821727683","name":"ELN-02 · Draft HEX-N wiki — all sections","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11821742472","name":"ELX-01 · Draft HEX-X wiki — all sections","lead":"Christian De Abreu","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11823272322","name":"[SPIKE] HT-02 · Investigate intermittent FCnt uplink gaps on HEX-T Dragino fleet","lead":"Eric Zhang","status":"Done","createdDate":"2026-04-22","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11831834911","name":"Ask changrong fup questions","lead":"Haemin Kim","status":"Done","createdDate":"2026-04-23","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
  {"id":"11834755352","name":"ask sabina to find locations and ask if we can do 40 at atlantic","lead":"Will Kadison","status":"Done","createdDate":"2026-04-23","completedDate":"2026-04-24","weekCreated":17,"weekDone":17},
];
// ─── SEED DATA END ────────────────────────────────────────────────────────────

const BOARD_ID = "18404792373";
const MAX_WEEKS = 10;

// ─── TUESDAY-START WEEK NUMBER ────────────────────────────────────────────────
// Weeks run Tue→Mon. We shift each date back 1 day (Tue becomes Mon, Mon slips
// into the prior ISO week) then compute ISO week number of the shifted date.
// Effect: a task created or completed on Monday belongs to the SAME week as
// the Tuesday it was assigned in — never bumped into the "next" week.
function tuesdayWeek(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr.slice(0,10) + "T12:00:00Z");
  if (isNaN(d)) return null;
  d.setUTCDate(d.getUTCDate() - 1); // shift: Tue→Mon, Mon→Sun (falls into prior ISO week)
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const startW1 = new Date(jan4);
  startW1.setUTCDate(jan4.getUTCDate() - ((jan4.getUTCDay() + 6) % 7));
  return Math.floor((d - startW1) / (7 * 864e5)) + 1;
}

// ─── CLASSIFICATION LOGIC ─────────────────────────────────────────────────────
function classifyItem(item, viewingWeek) {
  const st = (item.status || "").toLowerCase();
  if (st === "stuck" || st === "move to next board") return "stuck";
  if (st === "done") {
    const wd = item.weekDone;
    if (wd !== null && wd === item.weekCreated) return "done";       // same week = Done
    if (wd !== null && wd > item.weekCreated) return "late";         // 1+ weeks later = Done Late
    return "open";
  }
  return "open";
}

function getItemsActiveInWeek(allItems, week) {
  return allItems.filter(item => {
    if (item.weekCreated > week) return false;
    const st = (item.status || "").toLowerCase();
    const isDone = st === "done";
    if (isDone && item.weekDone !== null && item.weekDone < week) return false;
    return true;
  });
}

// ─── LIVE FETCH VIA MONDAY GRAPHQL ───────────────────────────────────────────
async function fetchLiveItems() {
  let all = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore) {
    const resp = await fetch("/api/monday", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ cursor }),
    });
    const data = await resp.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    all = all.concat(data.items || []);
    cursor = data.nextCursor || null;
    hasMore = !!cursor;
  }
  return all.map(item => ({
    ...item,
    weekCreated: tuesdayWeek(item.createdDate),
    weekDone: item.completedDate ? tuesdayWeek(item.completedDate) : null,
  }));
}

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg:"#07090f", panel:"#0d1117", border:"#161d2b",
    done:"#34d399", open:"#94a3b8", late:"#fbbf24", stuck:"#f87171", carryover:"#60a5fa", totalDone:"#2dd4bf",
    accent:"#60a5fa", text:"#dde1ec", muted:"#4e5a73", dim:"#1e2840",
    rowAlt:"#090d14", rowBase:"transparent",
    kpiActive:"#0d1117", kpiNew:"#0d1117",
  },
  light: {
    bg:"#f4f6fa", panel:"#ffffff", border:"#dde2ee",
    done:"#10b981", open:"#64748b", late:"#f59e0b", stuck:"#ef4444", carryover:"#3b82f6", totalDone:"#0d9488",
    accent:"#3b82f6", text:"#1a2035", muted:"#7a88a8", dim:"#e8ecf5",
    rowAlt:"#f8f9fc", rowBase:"transparent",
    kpiActive:"#ffffff", kpiNew:"#ffffff",
  },
};


const ThemeCtx = createContext(THEMES.dark);
const useC = () => useContext(ThemeCtx);

const useStatus = () => {
  const C = useC();
  return {
    done:  {label:"Done",      icon:"✓", color:C.done},
    open:  {label:"Open",      icon:"◌", color:C.open},
    late:  {label:"Late Done", icon:"↻", color:C.late},
    stuck: {label:"Stuck",     icon:"⊘", color:C.stuck},
  };
};

// ─── MINI COMPONENTS ─────────────────────────────────────────────────────────
const Pill = ({label,value,color,onClick,active})=>{
  const C = useC();
  return(
    <button onClick={onClick} style={{padding:"4px 11px",borderRadius:20,border:`1px solid ${color}${active?"":"44"}`,background:active?color+"22":"transparent",color:active?color:C.muted,fontSize:11,fontFamily:"'DM Mono',monospace",cursor:"pointer",fontWeight:active?700:400,textTransform:"uppercase",letterSpacing:"0.06em",transition:"all 0.15s"}}>
      {label}{value!==undefined?` (${value})`:""}
    </button>
  );
};

const KPI = ({label,value,sub,color,bg})=>{
  const C = useC();
  const bgColor = bg || C.panel;
  const textColor = bg ? "#ffffff" : color;
  const subColor = bg ? "rgba(255,255,255,0.55)" : C.muted;
  return(
    <div style={{background:bgColor,border:`1px solid ${bg ? "transparent" : color+"28"}`,borderRadius:10,padding:"14px 16px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:color}}/>
      <div style={{fontSize:10,color:bg ? "rgba(255,255,255,0.6)" : C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:4,fontFamily:"'DM Mono',monospace"}}>{label}</div>
      <div style={{fontSize:28,fontWeight:800,color:textColor,lineHeight:1,fontFamily:"'DM Mono',monospace"}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:subColor,marginTop:3}}>{sub}</div>}
    </div>
  );
};

// ─── TREND BAR CHART ─────────────────────────────────────────────────────────
function TrendChart({weeklyData,weeks,selected,onSelect,personFilter,allItems}){
  const C = useC();
  // If personFilter is active, recompute data filtered to that person
  const data = useMemo(()=>{
    if(!personFilter||!allItems) return weeklyData;
    const d={};
    weeks.forEach(w=>{
      const wi=getItemsActiveInWeek(allItems,w).filter(i=>(i.lead||"").split(",").map(l=>l.trim()).includes(personFilter));
      d[w]={done:0,open:0,late:0,stuck:0,active:wi.length};
      wi.forEach(i=>{const c=classifyItem(i,w);d[w][c]=(d[w][c]||0)+1;});
    });
    return d;
  },[personFilter,allItems,weeklyData,weeks]);
  const maxTotal = Math.max(...weeks.map(w=>{const d=data[w]||{};return(d.done||0)+(d.open||0)+(d.late||0)+(d.stuck||0);}),1);
  return(
    <div style={{display:"flex",gap:5,alignItems:"flex-end",height:90,paddingBottom:20,position:"relative"}}>
      {weeks.map(w=>{
        const d=data[w]||{done:0,open:0,late:0,stuck:0};
        const total=d.done+d.open+d.late+d.stuck;
        const isSel=w===selected;
        const segments=[{k:"stuck",c:C.stuck},{k:"late",c:C.late},{k:"open",c:C.open},{k:"done",c:C.done}];
        return(
          <div key={w} onClick={()=>onSelect(w)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer"}}>
            <div style={{width:"100%",height:70,display:"flex",flexDirection:"column",justifyContent:"flex-end",borderRadius:4,overflow:"hidden",border:`1px solid ${isSel?C.accent:C.border}`,transition:"border-color 0.2s",opacity:isSel?1:0.65}}>
              {total===0?<div style={{flex:1,background:C.dim}}/>:segments.map(({k,c})=>{
                const h=Math.max(total>0?Math.round((d[k]/maxTotal)*70):0,0);
                return h>0?<div key={k} style={{height:h,background:c,transition:"height 0.5s ease"}}/>:null;
              })}
            </div>
            <div style={{fontSize:9,color:isSel?C.accent:C.muted,fontFamily:"'DM Mono',monospace",fontWeight:isSel?700:400}}>W{w}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── PERSON TABLE ─────────────────────────────────────────────────────────────
function PersonTable({rows}){
  const C = useC();
  const STATUS = useStatus();
  const avatarColor=name=>{const cols=["#60a5fa","#3dd68c","#f5a623","#e05c5c","#a78bfa","#38bdf8","#fb923c","#f472b6"];return cols[name.charCodeAt(0)%cols.length];};
  return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"28px 1fr 32px 32px 32px 32px 56px",gap:8,padding:"0 12px 6px",borderBottom:`1px solid ${C.border}`,marginBottom:4}}>
        <div/><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em"}}>Name</div>
        {Object.entries(STATUS).map(([k,s])=>(
          <div key={k} style={{textAlign:"center",fontSize:10,color:s.color}}>{s.icon}</div>
        ))}
        <div style={{fontSize:9,color:C.muted}}>Done%</div>
      </div>
      <div style={{maxHeight:220,overflowY:"auto"}}>
        {rows.map(({name,counts,total})=>{
          const ac=avatarColor(name);
          const initials=name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
          const donePct=total>0?Math.round((counts.done||0)/total*100):0;
          return(
            <div key={name} style={{display:"grid",gridTemplateColumns:"28px 1fr 32px 32px 32px 32px 56px",gap:8,alignItems:"center",padding:"7px 12px",borderRadius:6,marginBottom:2,background:C.rowAlt}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:ac+"22",border:`1.5px solid ${ac}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:ac,fontFamily:"monospace"}}>{initials}</div>
              <div style={{fontSize:12,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name}</div>
              {["done","open","late","stuck"].map(k=>(
                <div key={k} style={{textAlign:"center",fontSize:12,fontWeight:700,color:STATUS[k].color,fontFamily:"'DM Mono',monospace"}}>{counts[k]||0}</div>
              ))}
              <div>
                <div style={{fontSize:9,color:STATUS.done.color,fontFamily:"monospace",marginBottom:2}}>{donePct}%</div>
                <div style={{height:3,background:C.dim,borderRadius:2}}><div style={{width:`${donePct}%`,height:3,background:STATUS.done.color,borderRadius:2,transition:"width 0.5s"}}/></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ITEMS LIST ───────────────────────────────────────────────────────────────
function ItemsList({items,week}){
  const C = useC();
  const STATUS = useStatus();
  const [filter,setFilter]=useState("all");
  const withClass=items.map(i=>({...i,cls:classifyItem(i,week),isCarryover:i.weekCreated<week}));
  const counts={};withClass.forEach(i=>{counts[i.cls]=(counts[i.cls]||0)+1;});
  const filtered=filter==="all"?withClass:withClass.filter(i=>i.cls===filter);

  return(
    <div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10}}>
        <Pill label="All" value={withClass.length} color={C.accent} active={filter==="all"} onClick={()=>setFilter("all")}/>
        {Object.entries(STATUS).map(([k,s])=>(
          <Pill key={k} label={s.label} value={counts[k]||0} color={s.color} active={filter===k} onClick={()=>setFilter(k)}/>
        ))}
      </div>
      <div style={{maxHeight:300,overflowY:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"10px 1fr 100px 72px 36px 44px",gap:10,alignItems:"center",padding:"3px 10px 6px",borderBottom:`1px solid ${C.border}`,marginBottom:2,position:"sticky",top:0,background:C.panel,zIndex:1}}>
          <div/><div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>Task</div>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>Lead</div>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>Status</div>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",textAlign:"center"}}>In</div>
          <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em",textAlign:"center"}}>Done</div>
        </div>
        {filtered.map((item,i)=>{
          const s=STATUS[item.cls];
          return(
            <div key={item.id} style={{display:"grid",gridTemplateColumns:"10px 1fr 100px 72px 36px 44px",gap:10,alignItems:"center",padding:"7px 10px",borderRadius:5,background:i%2===0?C.rowAlt:C.rowBase,marginBottom:1}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:s.color,flexShrink:0}}/>
              <div style={{display:"flex",alignItems:"center",gap:6,overflow:"hidden",minWidth:0}}>
                <span style={{fontSize:11,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</span>
                {item.isCarryover&&<span style={{fontSize:8,background:C.carryover+"18",color:C.carryover,padding:"1px 5px",borderRadius:8,flexShrink:0,border:`1px solid ${C.carryover}33`,fontFamily:"monospace"}}>carry</span>}
              </div>
              <div style={{fontSize:10,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.lead||"—"}</div>
              <div style={{fontSize:10,color:s.color,fontFamily:"monospace"}}>{s.icon} {s.label}</div>
              <div style={{fontSize:10,color:C.muted,fontFamily:"monospace",textAlign:"center"}}>W{item.weekCreated}</div>
              <div style={{fontSize:10,fontFamily:"monospace",textAlign:"center",color:item.weekDone?C.done:C.dim,fontWeight:item.weekDone?600:400}}>{item.weekDone?`W${item.weekDone}`:"—"}</div>
            </div>
          );
        })}
        {filtered.length===0&&<div style={{textAlign:"center",color:C.muted,fontSize:12,padding:"24px 0"}}>No items</div>}
      </div>
    </div>
  );
}


// ─── LINE CHART ───────────────────────────────────────────────────────────────
function LineChart({weeklyData, weeklyCarryover, weeklyCeiling, weeks, personFilter, allItems}) {
  const C = useC();
  // Recompute series data when a person filter is active
  const filteredData = useMemo(()=>{
    if(!personFilter||!allItems) return {wd:weeklyData, wc:weeklyCarryover, wg:weeklyCeiling};
    const wd={}, wc={}, wg={};
    weeks.forEach(w=>{
      const wi=getItemsActiveInWeek(allItems,w).filter(i=>(i.lead||"").split(",").map(l=>l.trim()).includes(personFilter));
      wd[w]={done:0,open:0,late:0,stuck:0,active:wi.length};
      wi.forEach(i=>{const c=classifyItem(i,w);wd[w][c]=(wd[w][c]||0)+1;});
      wc[w]=wi.filter(i=>i.weekCreated<w).length;
      wg[w]=wi.length > 0 ? 6 : 0; // 1 person ceiling = 6
    });
    return {wd, wc, wg};
  },[personFilter,allItems,weeklyData,weeklyCarryover,weeklyCeiling,weeks]);
  const {wd, wc, wg} = filteredData;
  const W = 560, H = 160, PAD = {top:16, right:16, bottom:24, left:32};
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const series = [
    {key:"active",   label:"Active",   color:C.accent,   values: weeks.map(w => (wd[w]||{active:0}).active  || Object.values(wd[w]||{}).reduce((a,b)=>a+b,0))},
    {key:"carryover",label:"Carryover",color:"#94a3b8",  values: weeks.map(w => wc[w]||0)},
    {key:"done",     label:"Done",     color:C.done,     values: weeks.map(w => (wd[w]||{}).done||0)},
    {key:"ceiling",  label:"Goal",     color:"#f5c842",  values: weeks.map(w => wg[w]||0), dashed:true},
  ];

  const allVals = series.flatMap(s=>s.values).filter(v=>v>0);
  const maxVal = Math.max(...allVals, 1);

  const xPos = i => PAD.left + (innerW / Math.max(weeks.length-1,1)) * i;
  const yPos = v => PAD.top + innerH - (v / maxVal) * innerH;

  const toPath = vals => vals.map((v,i) => `${i===0?"M":"L"}${xPos(i)},${yPos(v)}`).join(" ");

  // y-axis ticks
  const ticks = [0, Math.round(maxVal*0.5), maxVal];

  return (
    <div style={{width:"100%", overflowX:"auto"}}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%", height:"auto", display:"block"}}>
        {/* grid lines */}
        {ticks.map(t => (
          <line key={t} x1={PAD.left} x2={W-PAD.right} y1={yPos(t)} y2={yPos(t)}
            stroke={C.border} strokeWidth={1} strokeDasharray="3,3"/>
        ))}
        {/* y-axis labels */}
        {ticks.map(t => (
          <text key={t} x={PAD.left-4} y={yPos(t)+4} textAnchor="end"
            fontSize={8} fill={C.muted} fontFamily="DM Mono,monospace">{t}</text>
        ))}
        {/* x-axis labels */}
        {weeks.map((w,i) => (
          <text key={w} x={xPos(i)} y={H-4} textAnchor="middle"
            fontSize={8} fill={C.muted} fontFamily="DM Mono,monospace">W{w}</text>
        ))}
        {/* lines */}
        {series.map(s => (
          <path key={s.key} d={toPath(s.values)}
            fill="none" stroke={s.color} strokeWidth={s.dashed?1.5:2}
            strokeDasharray={s.dashed?"5,3":"none"} strokeLinecap="round" strokeLinejoin="round"
            opacity={s.dashed?0.5:1}/>
        ))}
        {/* dots */}
        {series.filter(s=>!s.dashed).map(s =>
          s.values.map((v,i) => (
            <circle key={i} cx={xPos(i)} cy={yPos(v)} r={3}
              fill={s.color} stroke={C.panel} strokeWidth={1.5}/>
          ))
        )}
      </svg>
      {/* legend */}
      <div style={{display:"flex",gap:14,flexWrap:"wrap",paddingLeft:PAD.left,marginTop:4}}>
        {series.map(s=>(
          <div key={s.key} style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:C.muted}}>
            <svg width={16} height={6}>
              <line x1={0} y1={3} x2={16} y2={3} stroke={s.color} strokeWidth={s.dashed?1.5:2}
                strokeDasharray={s.dashed?"4,2":"none"} opacity={s.dashed?0.6:1}/>
              {!s.dashed && <circle cx={8} cy={3} r={2.5} fill={s.color}/>}
            </svg>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  );
}


// ─── WEEK SCORE CARD ─────────────────────────────────────────────────────────
function WeekScoreCard({classified, carryoverCount, weekItems, selectedWeek, allItems}) {
  const C = useC();
  const [suggestion, setSuggestion] = useState(null);
  const [loadingSug, setLoadingSug] = useState(false);

  const total = classified.length;
  const done = classified.filter(i => i.cls === "done").length;
  const late = classified.filter(i => i.cls === "late").length;
  const stuck = classified.filter(i => i.cls === "stuck").length;
  const open = classified.filter(i => i.cls === "open").length;
  // Completion lens — items whose work actually finished THIS week
  const doneOnTimeThisWeek = classified.filter(i => i.weekDone === selectedWeek && i.weekCreated === selectedWeek).length;
  const doneFromPastThisWeek = classified.filter(i => i.weekDone === selectedWeek && i.weekCreated < selectedWeek).length;
  const totalDoneThisWeek = doneOnTimeThisWeek + doneFromPastThisWeek;
  const totalCompleted = done + late;
  const onTimePct = total > 0 ? Math.round((doneOnTimeThisWeek / total) * 100) : 0;
  const fromPastPct = total > 0 ? Math.round((doneFromPastThisWeek / total) * 100) : 0;
  const totalDonePct = total > 0 ? Math.round((totalDoneThisWeek / total) * 100) : 0;
  const completedPct = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;
  const carryoverPct = total > 0 ? Math.round((carryoverCount / total) * 100) : 0;
  // Cumulative — feel-good metric: how much have we shipped overall
  const allTimeDone = allItems.filter(i => (i.status||"").toLowerCase() === "done" && i.weekDone !== null).length;
  const allTimeTotal = allItems.length;
  const allTimeDonePct = allTimeTotal > 0 ? Math.round((allTimeDone / allTimeTotal) * 100) : 0;

  const scoreColor = onTimePct >= 70 ? C.done : onTimePct >= 40 ? C.open : C.stuck;

  const fetchSuggestion = async () => {
    setLoadingSug(true);
    setSuggestion(null);
    try {
      const stuckItems = classified.filter(i => i.cls === "stuck").map(i => i.name).join(", ");
      const lateItems = classified.filter(i => i.cls === "late").map(i => i.name).slice(0, 5).join(", ");
      const openItems = classified.filter(i => i.cls === "open").map(i => i.name).slice(0, 5).join(", ");

      const prompt = `You are a product team performance coach. Here is Week ${selectedWeek} data:
- Total tasks: ${total}, Done on time: ${done} (${onTimePct}%), Completed total: ${totalCompleted} (${completedPct}%), Open: ${open}, Stuck: ${stuck}, Late done: ${late}
- Carryover tasks: ${carryoverCount} (${carryoverPct}% of week load)
- Stuck items: ${stuckItems || "none"}
- Late done items: ${lateItems || "none"}
- Still open: ${openItems || "none"}

Give a single short paragraph (2-3 sentences max) with one specific, actionable improvement suggestion for next week. Be direct and practical. No bullet points, no headers.`;

      const resp = await fetch("/api/claude", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 150,
          messages: [{role: "user", content: prompt}]
        })
      });
      const data = await resp.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setSuggestion(text.trim());
    } catch(e) {
      setSuggestion("Could not load suggestion.");
    }
    setLoadingSug(false);
  };

  const ScoreBar = ({label, pct, color, sub}) => (
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</span>
        <span style={{fontSize:12,fontWeight:700,color,fontFamily:"monospace"}}>{pct}%{sub ? ` · ${sub}` : ""}</span>
      </div>
      <div style={{height:5,background:C.dim,borderRadius:3}}>
        <div style={{width:`${pct}%`,height:5,background:color,borderRadius:3,transition:"width 0.6s ease"}}/>
      </div>
    </div>
  );

  return (
    <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Weekly Score · W{selectedWeek}</div>
        <div style={{fontSize:26,fontWeight:800,color:scoreColor,fontFamily:"monospace"}}>{onTimePct}<span style={{fontSize:12,fontWeight:400,color:C.muted}}>% on time</span></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 24px"}}>
        <div>
          <ScoreBar label="Done on time" pct={onTimePct} color={C.done} sub={`${doneOnTimeThisWeek}/${total}`}/>
          <ScoreBar label="Done from past weeks" pct={fromPastPct} color={C.late} sub={`${doneFromPastThisWeek}/${total}`}/>
          <ScoreBar label="Total done this week" pct={totalDonePct} color={C.totalDone} sub={`${totalDoneThisWeek}/${total}`}/>
          <ScoreBar label="Carryover load" pct={carryoverPct} color={C.carryover} sub={`${carryoverCount}/${total}`}/>
        </div>
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
            {[
              {label:"Open",val:open,color:C.open},
              {label:"Stuck",val:stuck,color:C.stuck},
              {label:"Late Done",val:late,color:C.late},
              {label:"Done",val:done,color:C.done},
            ].map(({label,val,color})=>(
              <div key={label} style={{background:C.dim,borderRadius:6,padding:"6px 10px"}}>
                <div style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</div>
                <div style={{fontSize:18,fontWeight:800,color,fontFamily:"monospace"}}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI Suggestion */}
      <div style={{borderTop:`1px solid ${C.border}`,paddingTop:12,marginTop:4}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>✦ Suggestion for next week</div>
          <button onClick={fetchSuggestion} disabled={loadingSug} style={{fontSize:10,fontFamily:"monospace",background:"transparent",border:`1px solid ${C.accent}44`,color:C.accent,borderRadius:6,padding:"3px 10px",cursor:loadingSug?"not-allowed":"pointer",textTransform:"uppercase",letterSpacing:"0.06em"}}>
            {loadingSug ? "thinking..." : suggestion ? "↻ refresh" : "generate ✦"}
          </button>
        </div>
        {suggestion && <div style={{fontSize:12,color:C.text,lineHeight:1.7,background:C.accent+"0d",borderRadius:6,padding:"10px 12px",borderLeft:`3px solid ${C.accent}`}}>{suggestion}</div>}
        {!suggestion && !loadingSug && <div style={{fontSize:11,color:C.muted,fontStyle:"italic"}}>Click generate to get an AI-powered suggestion based on this week's data.</div>}
      </div>
    </div>
  );
}

// ─── PERSON FILTER BAR ────────────────────────────────────────────────────────
function PersonFilterBar({people, selected, onSelect}) {
  const C = useC();
  const avatarColor = name => {
    const cols = ["#60a5fa","#3dd68c","#f5a623","#e05c5c","#a78bfa","#38bdf8","#fb923c","#f472b6"];
    return cols[name.charCodeAt(0) % cols.length];
  };
  return (
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16,alignItems:"center"}}>
      <span style={{fontSize:9,color:C.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginRight:4}}>Filter:</span>
      <button onClick={()=>onSelect(null)} style={{padding:"3px 10px",borderRadius:16,border:`1px solid ${selected===null?C.accent:C.border}`,background:selected===null?C.accent+"22":"transparent",color:selected===null?C.accent:C.muted,fontSize:10,fontFamily:"monospace",cursor:"pointer",fontWeight:selected===null?700:400}}>
        All
      </button>
      {people.map(name => {
        const ac = avatarColor(name);
        const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
        const isSel = selected === name;
        return (
          <button key={name} onClick={()=>onSelect(isSel ? null : name)} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 10px 3px 5px",borderRadius:16,border:`1px solid ${isSel?ac:C.border}`,background:isSel?ac+"22":"transparent",color:isSel?ac:C.muted,fontSize:10,fontFamily:"monospace",cursor:"pointer",fontWeight:isSel?700:400}}>
            <div style={{width:18,height:18,borderRadius:"50%",background:ac+"33",border:`1px solid ${ac}66`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:ac}}>{initials}</div>
            {name.split(" ")[0]}
          </button>
        );
      })}
    </div>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────────
const APP_PASSWORD = import.meta.env.VITE_APP_PASSWORD;
const SESSION_KEY = "hx_auth";

function PasswordGate({ onAuth }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (input === APP_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setInput("");
    }
  };

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#07090f"}}>
      <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
        <span style={{color:"#dde1ec",fontFamily:"monospace",fontSize:14,letterSpacing:"0.08em",marginBottom:4}}>HEXMODAL</span>
        <input
          autoFocus
          type="password"
          placeholder="Password"
          value={input}
          onChange={e=>{setInput(e.target.value);setError(false);}}
          onKeyDown={e=>e.key==="Enter"&&submit()}
          style={{background:"#0d1117",border:`1px solid ${error?"#e05c5c":"#161d2b"}`,borderRadius:6,padding:"8px 14px",color:"#dde1ec",fontFamily:"monospace",fontSize:13,outline:"none",width:200}}
        />
        {error && <span style={{color:"#e05c5c",fontFamily:"monospace",fontSize:11}}>incorrect password</span>}
        <button onClick={submit} style={{background:"#60a5fa",color:"#07090f",border:"none",borderRadius:6,padding:"7px 24px",fontFamily:"monospace",fontSize:12,cursor:"pointer",letterSpacing:"0.06em"}}>ENTER</button>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const [authed, setAuthed] = useState(!APP_PASSWORD || sessionStorage.getItem(SESSION_KEY) === "1");
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <Dashboard />;
}

function Dashboard(){


  const [items,setItems]=useState(()=>{
    try{ const s=localStorage.getItem("hx_items"); return s?JSON.parse(s):SEED_ITEMS; }catch{ return SEED_ITEMS; }
  });
  const [loading,setLoading]=useState(false);

  const [refreshMsg,setRefreshMsg]=useState(null);
  const [selectedWeek,setSelectedWeek]=useState(18);
  const [dataSource,setDataSource]=useState(()=>localStorage.getItem("hx_items")?"live":"seed");
  const [themeName,setThemeName]=useState("light");
  const [pendingSeed,setPendingSeed]=useState(null);
  const [seedMsg,setSeedMsg]=useState(null);
  const [selectedPerson,setSelectedPerson]=useState(null);
  const C = THEMES[themeName];

  const handleRefresh=useCallback(async()=>{
    setLoading(true);setRefreshMsg("Fetching live data from Monday...");
    try{
      const live=await fetchLiveItems();
      if(live.length>0){setItems(live);setDataSource("live");localStorage.setItem("hx_items",JSON.stringify(live));setPendingSeed(live);setRefreshMsg(`✓ Loaded ${live.length} items live`);}
      else{setRefreshMsg("No data returned, keeping cached data");}
    }catch(e){setRefreshMsg("Refresh failed: "+e.message);}
    finally{setLoading(false);setTimeout(()=>setRefreshMsg(null),4000);}
  },[]);

  const handleSaveSeed=useCallback(async()=>{
    if(!pendingSeed) return;
    setSeedMsg("Saving...");
    try{
      const resp=await fetch("/api/save-seed",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:pendingSeed})});
      const data=await resp.json();
      if(!resp.ok) throw new Error(data.error||"Failed");
      setSeedMsg("✓ Seed data updated");
      setPendingSeed(null);
    }catch(e){setSeedMsg("Failed: "+e.message);}
    finally{setTimeout(()=>setSeedMsg(null),4000);}
  },[pendingSeed]);

  const allWeeks=useMemo(()=>[...new Set(items.map(i=>i.weekCreated).filter(Boolean))].sort((a,b)=>a-b),[items]);
  const displayWeeks=allWeeks.slice(-MAX_WEEKS);

  const weekItems=useMemo(()=>getItemsActiveInWeek(items,selectedWeek),[items,selectedWeek]);

  // All unique people across the selected week for filter bar
  const allPeople=useMemo(()=>{
    const s=new Set();
    weekItems.forEach(i=>(i.lead||"").split(",").map(l=>l.trim()).filter(Boolean).forEach(l=>s.add(l)));
    return [...s].sort();
  },[weekItems]);

  // Apply person filter — split-lead items count for both people
  const filteredWeekItems=useMemo(()=>{
    if(!selectedPerson) return weekItems;
    return weekItems.filter(i=>(i.lead||"").split(",").map(l=>l.trim()).includes(selectedPerson));
  },[weekItems,selectedPerson]);

  const classified=useMemo(()=>filteredWeekItems.map(i=>({...i,cls:classifyItem(i,selectedWeek),isCarryover:i.weekCreated<selectedWeek})),[filteredWeekItems,selectedWeek]);

  const counts=useMemo(()=>{const c={done:0,open:0,late:0,stuck:0};classified.forEach(i=>{c[i.cls]=(c[i.cls]||0)+1;});return c;},[classified]);
  const newThisWeek=classified.filter(i=>i.weekCreated===selectedWeek).length;
  const carryoverCount=classified.filter(i=>i.isCarryover).length;
  const unplannedCount=filteredWeekItems.filter(i=>i.name?.startsWith("[SPIKE]")).length;
  const doneOnTimeThisWeek=classified.filter(i=>i.weekDone===selectedWeek && i.weekCreated===selectedWeek).length;
  const doneLateThisWeek=classified.filter(i=>i.weekDone===selectedWeek && i.weekCreated<selectedWeek).length;
  const totalDoneThisWeek=doneOnTimeThisWeek+doneLateThisWeek;

  const personRows=useMemo(()=>{
    const map={};
    classified.forEach(item=>{
      const leads=(item.lead||"").split(",").map(l=>l.trim()).filter(Boolean);
      const names=leads.length>0?leads:["Unassigned"];
      names.forEach(n=>{
        if(!map[n])map[n]={done:0,open:0,late:0,stuck:0};
        map[n][item.cls]=(map[n][item.cls]||0)+1;
      });
    });
    return Object.entries(map).map(([name,counts])=>({name,counts,total:Object.values(counts).reduce((a,b)=>a+b,0)})).sort((a,b)=>b.total-a.total);
  },[classified]);

  const handleExport = useCallback(() => {
    const total = classified.length;
    const done = classified.filter(i=>i.cls==="done").length;
    const late = classified.filter(i=>i.cls==="late").length;
    const stuck = classified.filter(i=>i.cls==="stuck").length;
    const open = classified.filter(i=>i.cls==="open").length;
    const doneOnTimeThisWeek = classified.filter(i=>i.weekDone===selectedWeek && i.weekCreated===selectedWeek).length;
    const doneFromPastThisWeek = classified.filter(i=>i.weekDone===selectedWeek && i.weekCreated<selectedWeek).length;
    const totalDoneThisWeek = doneOnTimeThisWeek + doneFromPastThisWeek;
    const onTimePct = total > 0 ? Math.round((doneOnTimeThisWeek/total)*100) : 0;
    const fromPastPct = total > 0 ? Math.round((doneFromPastThisWeek/total)*100) : 0;
    const totalDonePct = total > 0 ? Math.round((totalDoneThisWeek/total)*100) : 0;
    const clsLabel = {done:"Done", late:"Done Late", open:"Open", stuck:"Stuck"};
    const clsColor = {done:"#1a9e5f", late:"#7c3aed", open:"#4b5563", stuck:"#c0392b"};
    const kpis = [
      {label:"Assigned", value:total, color:"#64748b"},
      {label:"New Items", value:classified.filter(i=>i.weekCreated===selectedWeek).length, color:"#3b82f6"},
      {label:"Done on Time", value:doneOnTimeThisWeek, color:"#10b981"},
      {label:"Done Late", value:doneFromPastThisWeek, color:"#f59e0b"},
      {label:"Total Done this Week", value:totalDoneThisWeek, color:"#0d9488"},
      {label:"Still Open", value:open, color:"#94a3b8"},
      {label:"Stuck", value:stuck, color:"#ef4444"},
    ];
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
    <title>Hexmodal Week ${selectedWeek}</title>
    <style>
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:system-ui,sans-serif;font-size:11px;color:#1a2035;padding:32px;background:#fff;}
      h1{font-size:20px;font-weight:800;letter-spacing:.04em;}
      h2{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b;margin:20px 0 8px;}
      .sub{font-size:10px;color:#64748b;margin-top:2px;}
      .kpis{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:4px;}
      .kpi{border-radius:6px;padding:10px 6px 8px;text-align:center;border:1px solid;}
      .kpi-val{font-size:22px;font-weight:800;line-height:1;}
      .kpi-lbl{font-size:8px;text-transform:uppercase;letter-spacing:.06em;margin-top:4px;color:#64748b;}
      .bar-row{margin-bottom:8px;}
      .bar-label{display:flex;justify-content:space-between;margin-bottom:3px;font-size:10px;color:#374151;}
      .bar-track{background:#e5e7eb;border-radius:4px;height:8px;overflow:hidden;}
      .bar-fill{height:8px;border-radius:4px;}
      table{width:100%;border-collapse:collapse;font-size:10px;}
      th{background:#f1f5f9;text-align:left;padding:5px 8px;font-weight:700;font-size:9px;text-transform:uppercase;letter-spacing:.05em;color:#64748b;border-bottom:1px solid #e2e8f0;}
      td{padding:5px 8px;border-bottom:1px solid #f1f5f9;vertical-align:top;}
      .tag{display:inline-block;padding:1px 6px;border-radius:10px;font-size:9px;font-weight:600;color:#fff;}
      @media print{body{padding:20px;} h2{margin:14px 0 6px;} @page{margin:1cm;}}
    </style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:12px;border-bottom:2px solid #0d1117;">
      <div><h1>HEXMODAL</h1><div class="sub">Week ${selectedWeek} Report &nbsp;·&nbsp; ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div></div>
      <div style="text-align:right;font-size:10px;color:#94a3b8;">${onTimePct}% on time</div>
    </div>
    <div class="kpis">
      ${kpis.map(k=>`<div class="kpi" style="border-color:${k.color}33;background:${k.color}0d;"><div class="kpi-val" style="color:${k.color};">${k.value}</div><div class="kpi-lbl">${k.label}</div></div>`).join("")}
    </div>
    <h2>Weekly Score</h2>
    ${(() => {
      const carryoverPct = total > 0 ? Math.round((carryoverCount/total)*100) : 0;
      return [
        {label:"Done on time", val:`${doneOnTimeThisWeek}/${total}`, pct:onTimePct, color:"#10b981"},
        {label:"Done from past weeks", val:`${doneFromPastThisWeek}/${total}`, pct:fromPastPct, color:"#f59e0b"},
        {label:"Total done this week", val:`${totalDoneThisWeek}/${total}`, pct:totalDonePct, color:"#0d9488"},
        {label:"Carryover load", val:`${carryoverCount}/${total}`, pct:carryoverPct, color:"#3b82f6"},
      ].map(b=>`<div class="bar-row"><div class="bar-label"><span>${b.label}</span><span style="color:${b.color};font-weight:700;">${b.pct}% &nbsp; ${b.val}</span></div><div class="bar-track"><div class="bar-fill" style="width:${b.pct}%;background:${b.color};"></div></div></div>`).join("");
    })()}
    <h2>By Person</h2>
    <table>
      <thead><tr><th>Name</th><th>Active</th><th>Done</th><th>Done Late</th><th>Open</th><th>Stuck</th></tr></thead>
      <tbody>${personRows.map(r=>`<tr><td style="font-weight:600;">${r.name}</td><td>${r.total}</td><td style="color:#1a9e5f;font-weight:600;">${r.counts.done||0}</td><td style="color:#7c3aed;">${r.counts.late||0}</td><td style="color:#4b5563;">${r.counts.open||0}</td><td style="color:#c0392b;">${r.counts.stuck||0}</td></tr>`).join("")}</tbody>
    </table>
    <h2>All Tasks (${classified.length})</h2>
    <table>
      <thead><tr><th>Task</th><th>Lead</th><th>Status</th><th>Created</th><th>Completed</th></tr></thead>
      <tbody>${classified.map(i=>`<tr><td>${i.name}</td><td style="color:#64748b;">${i.lead||"—"}</td><td><span class="tag" style="background:${clsColor[i.cls]||"#888"};">${clsLabel[i.cls]||i.cls}</span></td><td style="color:#94a3b8;">${i.createdDate||"—"}</td><td style="color:#94a3b8;">${i.completedDate||"—"}</td></tr>`).join("")}</tbody>
    </table>
    <script>window.onload=()=>{window.print();}</script>
    </body></html>`;
    const win = window.open("","_blank");
    win.document.write(html);
    win.document.close();
  }, [selectedWeek, classified, carryoverCount, unplannedCount, personRows, items]);

  const weeklyData=useMemo(()=>{
    const d={};
    displayWeeks.forEach(w=>{
      const wi=getItemsActiveInWeek(items,w);
      d[w]={done:0,open:0,late:0,stuck:0,active:wi.length};
      wi.forEach(i=>{const c=classifyItem(i,w);d[w][c]=(d[w][c]||0)+1;});
    });
    return d;
  },[items,displayWeeks]);

  const weeklyCarryover=useMemo(()=>{
    const d={};
    displayWeeks.forEach(w=>{
      d[w]=getItemsActiveInWeek(items,w).filter(i=>i.weekCreated<w).length;
    });
    return d;
  },[items,displayWeeks]);

  const weeklyCeiling=useMemo(()=>{
    // Ceiling = unique lead count for that week * 6
    const d={};
    displayWeeks.forEach(w=>{
      const wi=getItemsActiveInWeek(items,w);
      const leads=new Set();
      wi.forEach(item=>{
        (item.lead||"").split(",").map(l=>l.trim()).filter(Boolean).forEach(l=>leads.add(l));
      });
      d[w]=leads.size*6;
    });
    return d;
  },[items,displayWeeks]);

  const unassigned=classified.filter(i=>!i.lead||i.lead.trim()==="");
  const STATUS = {
    done:{label:"Done",icon:"✓",color:C.done},
    open:{label:"Open",icon:"◌",color:C.open},
    late:{label:"Late Done",icon:"↻",color:C.late},
    stuck:{label:"Stuck",icon:"⊘",color:C.stuck},
  };
  const isLight = themeName === "light";

  return(
    <ThemeCtx.Provider value={C}>
    <div style={{background:C.bg,minHeight:"100vh",padding:20,fontFamily:"'DM Mono','Fira Mono','Courier New',monospace",color:C.text,boxSizing:"border-box",transition:"background 0.25s, color 0.25s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
        button:hover{opacity:0.85;}
      `}</style>

      {/* HEADER */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:20,gap:12,flexWrap:"wrap"}}>
        <div>
          <div style={{fontSize:9,color:C.muted,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:5}}>hexmodal · done by friday</div>
          <div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:"-0.01em"}}>
            Weekly Performance <span style={{color:C.accent}}>/ W{selectedWeek}</span>
          </div>
          <div style={{fontSize:10,color:C.muted,marginTop:4}}>
            {dataSource==="seed"?"📦 Cached data (Apr 29 2026 — live)":"🔴 Live data"} · {items.length} items
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
          <div style={{display:"flex",gap:6}}>
            {/* THEME TOGGLE */}
            <button
              onClick={()=>setThemeName(t=>t==="dark"?"light":"dark")}
              title={isLight?"Switch to dark mode":"Switch to light mode"}
              style={{background:C.panel,border:`1px solid ${C.border}`,color:C.muted,borderRadius:8,padding:"7px 12px",cursor:"pointer",fontSize:14,lineHeight:1,transition:"all 0.2s"}}
            >
              {isLight?"🌙":"☀️"}
            </button>
            <button onClick={handleRefresh} disabled={loading} style={{background:loading?"transparent":C.accent+"18",border:`1px solid ${C.accent}55`,color:loading?C.muted:C.accent,borderRadius:8,padding:"7px 14px",cursor:loading?"not-allowed":"pointer",fontSize:11,fontFamily:"inherit",letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>
              {loading?"loading...":"↻ refresh live"}
            </button>
            <button onClick={handleExport} style={{background:C.panel,border:`1px solid ${C.border}`,color:C.text,borderRadius:8,padding:"7px 14px",cursor:"pointer",fontSize:11,fontFamily:"inherit",letterSpacing:"0.06em",textTransform:"uppercase",fontWeight:600}}>
              ⬇ export pdf
            </button>
          </div>
          {refreshMsg&&<div style={{fontSize:10,color:C.muted,textAlign:"right"}}>{refreshMsg}</div>}
          {(pendingSeed||seedMsg)&&<div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:8,marginTop:4}}>
            {seedMsg?<span style={{fontSize:10,color:C.muted,fontFamily:"monospace"}}>{seedMsg}</span>:<>
              <span style={{fontSize:10,color:C.muted}}>overwrite seed data with live?</span>
              <button onClick={handleSaveSeed} style={{fontSize:10,fontFamily:"monospace",background:"transparent",border:`1px solid ${C.accent}55`,color:C.accent,borderRadius:6,padding:"2px 10px",cursor:"pointer",letterSpacing:"0.06em"}}>save as seed</button>
              <button onClick={()=>setPendingSeed(null)} style={{fontSize:10,fontFamily:"monospace",background:"transparent",border:`1px solid ${C.muted}44`,color:C.muted,borderRadius:6,padding:"2px 8px",cursor:"pointer"}}>dismiss</button>
            </>}
          </div>}
        </div>
      </div>

      {/* WEEK SELECTOR */}
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:20}}>
        {displayWeeks.map(w=>(
          <button key={w} onClick={()=>setSelectedWeek(w)} style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${selectedWeek===w?C.accent:C.border}`,background:selectedWeek===w?C.accent+"20":"transparent",color:selectedWeek===w?C.accent:C.muted,fontSize:10,fontFamily:"inherit",cursor:"pointer",fontWeight:selectedWeek===w?700:400}}>
            W{w}
            {weeklyData[w]&&<span style={{marginLeft:4,opacity:0.6}}>{(weeklyData[w].done||0)+(weeklyData[w].open||0)+(weeklyData[w].late||0)+(weeklyData[w].stuck||0)}</span>}
          </button>
        ))}
      </div>

      {/* KPI ROW */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:8,marginBottom:16}}>
        <KPI label="Assigned" value={filteredWeekItems.length} color={C.muted}/>
        <KPI label="New Items" value={newThisWeek} sub={`${carryoverCount} carry`} color={C.carryover}/>
        <KPI label="Done on Time" value={doneOnTimeThisWeek} color={C.done}/>
        <KPI label="Done Late" value={doneLateThisWeek} color={C.late}/>
        <KPI label="Total Done this Week" value={totalDoneThisWeek} color={C.totalDone}/>
        <KPI label="Still Open" value={counts.open} color={C.open}/>
        <KPI label="Stuck" value={counts.stuck} color={C.stuck}/>
      </div>

      {/* SCORE CARD */}
      <WeekScoreCard classified={classified} carryoverCount={carryoverCount} weekItems={filteredWeekItems} selectedWeek={selectedWeek} allItems={items}/>

      {/* PERSON FILTER */}
      <PersonFilterBar people={allPeople} selected={selectedPerson} onSelect={setSelectedPerson}/>

      {/* TREND + TEAM */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
        <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>
            Weekly Trend{selectedPerson ? ` · ${selectedPerson.split(" ")[0]}` : ""}
          </div>
          <TrendChart weeklyData={weeklyData} weeks={displayWeeks} selected={selectedWeek} onSelect={setSelectedWeek} personFilter={selectedPerson} allItems={items}/>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:16}}>
            {Object.entries(STATUS).map(([k,s])=>(
              <div key={k} style={{display:"flex",alignItems:"center",gap:4,fontSize:9,color:C.muted}}>
                <div style={{width:7,height:7,borderRadius:1,background:s.color}}/>
                {s.label}
              </div>
            ))}
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:14}}>
            <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Trend Lines</div>
            <LineChart weeklyData={weeklyData} weeklyCarryover={weeklyCarryover} weeklyCeiling={weeklyCeiling} weeks={displayWeeks} personFilter={selectedPerson} allItems={items}/>
          </div>
        </div>

        <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
          <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>
            Tasks per Person{selectedPerson ? ` · ${selectedPerson.split(" ")[0]}` : ""}
          </div>
          <PersonTable rows={personRows}/>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:12}}>
        <div style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>
          All Items — Week {selectedWeek}{selectedPerson ? ` · ${selectedPerson}` : ""}
        </div>
        <ItemsList items={filteredWeekItems} week={selectedWeek}/>
      </div>

      {/* UNASSIGNED ALERT */}
      {unassigned.length>0&&(
        <div style={{background:C.late+"0a",border:`1px solid ${C.late}33`,borderRadius:10,padding:14}}>
          <div style={{fontSize:10,color:C.late,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:8}}>⚠ {unassigned.length} unassigned item{unassigned.length>1?"s":""} — needs a lead</div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {unassigned.map(item=>(
              <a key={item.id} href={`https://hexmodal.monday.com/boards/${BOARD_ID}/pulses/${item.id}`} target="_blank" rel="noreferrer" style={{fontSize:11,color:C.muted,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:C.late,fontSize:9}}>→</span>
                <span>{item.name}</span>
                <span style={{fontSize:9,color:C.muted,opacity:0.5,fontFamily:"monospace"}}>W{item.weekCreated}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
    </ThemeCtx.Provider>
  );
}
