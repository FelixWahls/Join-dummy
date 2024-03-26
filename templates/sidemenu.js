    function submenuInit(){
        let submenu = document.getElementById('submenu');
        if(window.innerWidth <= 1100){
            submenu.innerHTML = '';
        submenu.innerHTML = `
        <div class="submenu">
                        <div class="submenuItem">
                            <span class="submenuText">Help</span>
                        </div>
                        <div class="submenuItem">
                            <span class="submenuText">Legal Notice</span>
                        </div>
                        <div class="submenuItem">
                            <span class="submenuText">Privacy Policy</span>
                        </div>
                        <div class="submenuItem">
                            <span class="submenuText">Log out</span>
                        </div>
                    </div>
        `;
        }
        document.getElementById('submenu').classList.add('submenuTransition');
        
        
    }



/*
                <div class="submenu">
					<div class="submenuItem">
						<span class="submenuText">Help</span>
					</div>
					<div class="submenuItem">
						<span class="submenuText">Legal Notice</span>
					</div>
					<div class="submenuItem">
						<span class="submenuText">Privacy Policy</span>
					</div>
					<div class="submenuItem">
						<span class="submenuText">Log out</span>
					</div>
				</div>

*/