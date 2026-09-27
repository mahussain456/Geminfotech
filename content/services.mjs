export const site = {
  origin: 'https://www.thegeminfo.com',
  name: 'Gem Infotech',
  phone: '+16699002400',
  email: 'ahmed@thegeminfo.com',
  cities: ['San Francisco', 'Walnut Creek', 'Lafayette', 'San Ramon', 'Danville'],
};
export const services = [
  {
    slug:'computer-repair', name:'Computer repair', title:'Bay Area Computer Repair | Gem Infotech',
    description:'On-site laptop and desktop repair for Bay Area homes and small businesses. Diagnostics, hardware repairs, screen replacement and data recovery. Get a quote.',
    heading:'Computer repair in the Bay Area',
    summary:'Gem Infotech provides on-site laptop and desktop support for Bay Area homes and small businesses, including diagnostics, hardware repairs, screen replacement and performance troubleshooting.',
    intro:'A slow, unreliable or damaged computer can interrupt work, school and everyday tasks. We help identify whether the problem is hardware, software or configuration, then explain the practical repair options and cost before work begins.',
    includes:['Diagnostics for startup problems, freezing and unexpected shutdowns.','Hardware troubleshooting, component replacement and laptop screen repairs.','Performance troubleshooting and configuration improvements.','Assessment of data recovery options when files are missing or a drive has failed.'],
    preparation:'Tell us the computer brand and model, what changed before the problem started, and any error message you can see. Let us know if files are important and whether you have a backup. Avoid reinstalling the operating system before discussing data recovery needs.',
    expectation:'Some issues can be addressed through configuration; others need replacement parts or further assessment. The right repair depends on the device, the diagnosis and part availability. Data recovery outcomes cannot be guaranteed.',
    faqs:[['Can you repair laptops and desktop computers?','Yes. Gem Infotech helps with laptop and desktop diagnostics, hardware issues, screen repairs and performance problems. Share the make and model when requesting a quote.'],['Is data recovery included in computer repair?','Data recovery is one of the services we can assess. The available options depend on the drive and the cause of the data loss; a successful recovery cannot be promised before assessment.']],
    related:['os-installation','virus-removal','wifi-setup']
  },
  {
    slug:'wifi-setup', name:'WiFi & networking', title:'Bay Area WiFi Setup & Troubleshooting | Gem Infotech',
    description:'WiFi setup and troubleshooting across the Bay Area. Get help with routers, mesh networks, dead zones and network security for your home or small office.',
    heading:'WiFi setup and troubleshooting in the Bay Area',
    summary:'Gem Infotech helps Bay Area households and small businesses set up routers and mesh WiFi, troubleshoot weak coverage, and configure more reliable, secure local networks.',
    intro:'A strong signal in one room does not always mean a reliable connection everywhere. We look at your equipment, layout and connected devices to understand where interruptions happen and which changes are likely to help.',
    includes:['Router installation and configuration for your home or office.','Mesh network setup and placement to address weak coverage.','Troubleshooting dropped connections and device connection problems.','Network security configuration and WiFi performance optimization.'],
    preparation:'Have your router or mesh model available, note which rooms have problems, and list the devices affected. If you rent equipment from your internet provider, tell us. Keep account credentials private until they are needed during the service visit.',
    expectation:'A WiFi problem may involve local coverage, equipment or the internet connection supplied by your provider. We help distinguish these causes. Changes to local WiFi cannot increase the speed of the internet plan you purchase.',
    faqs:[['Can a mesh system help with WiFi dead zones?','A mesh system can improve coverage in some layouts. Placement, building materials and the existing connection all matter; we assess the setup before recommending a change.'],['Do you support small-office networks?','Yes. We provide router setup, WiFi troubleshooting and networking as part of our Bay Area small-business support.']],
    related:['office-setup','printer-setup','computer-repair']
  },
  {
    slug:'virus-removal',name:'Virus & malware removal',title:'Bay Area Virus & Malware Removal | Gem Infotech',
    description:'Get help with virus removal, malware cleanup, antivirus installation and security configuration for Bay Area home and small-business computers.',
    heading:'Virus and malware removal in the Bay Area',
    summary:'Gem Infotech provides malware assessment, system scans, virus removal and security configuration for Bay Area home and small-business computers.',
    intro:'Unexpected pop-ups, changed browser settings or unfamiliar software can be signs that a computer needs attention. We investigate the symptoms, discuss the scope of the problem and help plan cleanup and recovery.',
    includes:['System scans and investigation of suspicious software.','Virus and malware removal.','Antivirus installation and security configuration.','Assessment of recovery options following ransomware or related data loss.'],
    preparation:'Write down the symptoms and when they began. Tell us about security alerts or affected files without emailing passwords, recovery keys or sensitive documents. If you suspect an active compromise, call to discuss the situation before using the device for sensitive tasks.',
    expectation:'The work required depends on the type and extent of the infection. Some incidents require restoration or reinstallation rather than a simple cleanup. Encrypted or damaged files may not be recoverable, and we do not promise a specific recovery outcome.',
    faqs:[['Can you install antivirus protection after cleanup?','Yes. Antivirus installation and security configuration are available alongside malware removal. The appropriate setup depends on your device and needs.'],['Can you recover files affected by ransomware?','We can assess recovery options, but recovery depends on the incident, file condition and available backups. Contact us to discuss the situation; recovery is not guaranteed.']],
    related:['computer-repair','os-installation','emergency']
  },
  {
    slug:'office-setup',name:'Small office setup',title:'Bay Area Small Office IT Setup | Gem Infotech',
    description:'Set up your Bay Area office with workstations, WiFi, printers, VoIP, file sharing and collaboration tools. Local, on-site support from Gem Infotech.',
    heading:'Small office IT setup in the Bay Area',
    summary:'Gem Infotech helps Bay Area small businesses set up the technology their teams use every day: workstations, networks, printers, VoIP, file sharing and collaboration tools.',
    intro:'Moving into an office or equipping a growing team involves more than connecting devices. We help bring the individual parts together so that workstations, connectivity and shared tools support the way your business works.',
    includes:['Workstation deployment and device configuration.','Office networking, WiFi and shared printer setup.','VoIP phone, file-sharing and cloud collaboration setup.','Security camera setup and coordination of the office technology environment.'],
    preparation:'Share the number of users and devices, your office layout, existing equipment and any move-in date. Identify the tools your team already uses and any remote IT contact who needs to be involved. A clear inventory helps define the scope.',
    expectation:'We discuss the equipment, dependencies and configuration work before providing a quote. Software subscriptions, internet service and hardware requirements vary by office; a setup request is not an ongoing managed IT contract.',
    faqs:[['Can you help a small office that does not have local IT staff?','Yes. We offer office setup and on-site support. For hands-on tasks coordinated by a remote IT team, see our smart hands support service.'],['Do you set up shared printers and collaboration tools?','Yes. Printer setup, file sharing and cloud collaboration configuration are part of the office setup services we can discuss in your quote.']],
    related:['smart-hands','wifi-setup','printer-setup']
  },
  {
    slug:'os-installation',name:'OS installation',title:'Windows & macOS Installation in the Bay Area | Gem Infotech',
    description:'Windows and macOS installation, upgrades, drivers and system configuration for Bay Area computers. Discuss compatibility and backup needs with Gem Infotech.',
    heading:'Windows and macOS installation in the Bay Area',
    summary:'Gem Infotech helps Bay Area computer owners with clean Windows and macOS installations, operating-system upgrades, drivers and system configuration.',
    intro:'A fresh installation can be useful when a system is damaged, a drive has changed or a computer needs a clean start. It is a different job from recovering missing files, so we discuss your data and software needs before choosing an approach.',
    includes:['Clean Windows and macOS installations on compatible hardware.','Operating-system upgrades and configuration.','Driver installation and troubleshooting.','System setup to help you return to everyday use.'],
    preparation:'Make a list of the files and applications you need to keep. Tell us what backups are available, and have your legitimate software licenses ready where required. Do not send passwords or license keys through the website form.',
    expectation:'Compatibility, licensing and backup requirements depend on the computer and the operating system. Reinstallation can remove existing data and applications; agree on the scope and data-handling plan before work begins.',
    faqs:[['Will a clean installation keep all my files?','Not necessarily. A clean installation may remove files and applications. Discuss your backup and data requirements with us before authorizing the work.'],['Can you help with drivers after installation?','Yes. Driver setup and system configuration are part of our operating-system installation services.']],
    related:['computer-repair','virus-removal','office-setup']
  },
  {
    slug:'printer-setup',name:'Printer setup',title:'Bay Area Printer Setup & Troubleshooting | Gem Infotech',
    description:'Wired and wireless printer setup for Bay Area homes and offices. Help with drivers, shared printing and scan-to-email configuration from Gem Infotech.',
    heading:'Printer setup and troubleshooting in the Bay Area',
    summary:'Gem Infotech sets up home and office printers across the Bay Area, including wired and wireless connections, drivers, network sharing and scan-to-email.',
    intro:'A printer can be connected to WiFi and still be unavailable to your computer. We help work through the connection, driver and sharing settings so the devices you use can communicate with the printer.',
    includes:['Wired and wireless printer installation.','Driver installation and troubleshooting.','Shared printing configuration across a local network.','Scan-to-email setup for supported printers and accounts.'],
    preparation:'Share your printer model, computer operating system and the exact error or behavior. Tell us whether one device or every device is affected, and whether you recently changed the router, network name or computer.',
    expectation:'Available features depend on printer compatibility, network conditions and account settings. A setup visit addresses configuration and connection problems; describe suspected physical printer damage when requesting a quote.',
    faqs:[['Can you connect a printer to several computers?','We can configure network sharing for supported printers and devices. Tell us the printer model and the computers that need access.'],['Can you help with scan-to-email?','Yes, for supported devices and email configurations. We will discuss the printer and account requirements before setting it up.']],
    related:['wifi-setup','office-setup','computer-repair']
  },
  {
    slug:'smart-hands',name:'Smart hands support',title:'Bay Area On-Site Smart Hands IT Support | Gem Infotech',
    description:'Local hands-on IT assistance for remote teams in the Bay Area. Equipment racking, cable management and device staging from Gem Infotech.',
    heading:'On-site smart hands support in the Bay Area',
    summary:'Gem Infotech provides local, hands-on technical assistance for remote IT teams supporting Bay Area workplaces without their own on-site IT staff.',
    intro:'Some tasks require someone physically present even when the IT team works remotely. Smart hands support connects a local technician with your remote team and a defined work plan, helping turn remote instructions into on-site action.',
    includes:['Equipment racking and physical device placement.','Cable management and connection tasks.','Device staging and hands-on setup assistance.','On-site technical assistance coordinated with a remote IT team.'],
    preparation:'Provide the site location, access requirements, equipment inventory, remote contact and written task list. Identify any approved work window and which changes require authorization from your team. Do not place credentials in a public request.',
    expectation:'Scope, access and responsibility should be agreed before the visit. Smart hands is task-based assistance, not a claim of continuous monitoring, guaranteed uptime or a managed service agreement.',
    faqs:[['What does smart hands support mean?','It means a local technician performs agreed physical IT tasks while coordinating with a remote team, such as equipment staging, racking and cabling.'],['Can our remote IT team direct the visit?','Yes. Share the remote contact, task list, access arrangements and approval requirements when discussing the service.']],
    related:['office-setup','wifi-setup','emergency']
  },
  {
    slug:'emergency',name:'Emergency support',title:'24/7 Emergency Tech Support in the Bay Area | Gem Infotech',
    description:'Call Gem Infotech for urgent Bay Area tech support. Help with critical system failures, data loss and ransomware incidents. Emergency support available 24/7.',
    heading:'Emergency tech support in the Bay Area',
    summary:'Gem Infotech offers 24/7 emergency support for urgent Bay Area technology problems, including critical system failures, data loss and ransomware incidents. Call 669.900.2400 to discuss the issue.',
    intro:'When an important system stops working, a clear description of what happened is the fastest way to begin a useful conversation. Calling is the best starting point for urgent help; a website email draft is not an emergency dispatch system.',
    includes:['Priority assessment of critical computer and system failures.','Help assessing urgent data loss and recovery options.','Support discussing ransomware and related security incidents.','Coordination of the next practical steps to restore service where possible.'],
    preparation:'Be ready to describe the affected systems, the symptoms, the time the problem began and how many people are affected. Note any backups and recent changes. Do not send sensitive files or passwords with your initial request.',
    expectation:'Emergency availability does not mean a guaranteed arrival or repair time. The response depends on location, the issue and availability. Recovery and repair outcomes depend on the condition of the affected systems.',
    faqs:[['How do I request emergency help?','Call 669.900.2400 and explain the issue, affected devices and location. Calling is preferable to preparing an email request for an urgent problem.'],['Is emergency support available outside normal hours?','Yes. Regular hours are 8am–8pm daily, with emergency support available 24/7. Contact us to discuss the situation and availability.']],
    related:['computer-repair','virus-removal','smart-hands']
  }
];
