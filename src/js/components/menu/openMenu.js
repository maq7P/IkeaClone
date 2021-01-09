import Subcatalog from './subcatalog'
export default class OpenMenu {
    constructor(triggers, btnCloses, thatWillOpen, activeClasse, innerMenu = {}) {
        this.triggers = document.querySelectorAll(triggers)
        this.thatWillOpen = document.querySelector(thatWillOpen)
        this.btnCloses = document.querySelectorAll(btnCloses)
        this.activeClasse = activeClasse
        this.innerMenu = document.querySelector(innerMenu.menu)
        this.innerActive = innerMenu.activeClass;
        this.innerTriggers = document.querySelectorAll(innerMenu.triggers);
        this.innerCloses = document.querySelectorAll(innerMenu.close)

        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.check = this.check.bind(this)
    }

    open(active, menu){
        menu.classList.add(active);
        if (active === this.activeClasse) {
            document.querySelector('.overlay').classList.add('active');
        }
        this.check()
    }

    close(active, menu){
        menu.classList.remove(active);
        if (active === this.activeClasse) {
            document.querySelector('.overlay').classList.remove('active');
        }
        this.check()
    }

    check(){
        if (!this.thatWillOpen.classList.contains(this.activeClasse) &&
            this.innerMenu.classList.contains(this.innerActive)){
                this.close(this.innerActive, this.innerMenu)
        }
    }

    event(foo, triggers, active, menu, inner) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                if (inner){
                    new Subcatalog().creatInnerMenu(e.target.textContent);
                    foo(active, menu);
                } else{
                    foo(active, menu)
                }
            });
        });

        document.addEventListener('click', e => {
           if(e.target.closest('.overlay')){
                this.close(active, menu);
           }
        })
        document.addEventListener('keydown', (e) => {
           if(e.keyCode === 27){
               this.close(active, menu);
           }
        })
    }

    init(){
        this.event(this.open, this.triggers, this.activeClasse, this.thatWillOpen);
        this.event(this.close, this.btnCloses, this.activeClasse, this.thatWillOpen);
        this.event(this.open, this.innerTriggers, this.innerActive, this.innerMenu, true);
        this.event(this.close, this.innerCloses, this.innerActive, this.innerMenu, true);
    }
}
