import {Component} from '@angular/core';
import {PopUpService} from "./services/pop-up/pop-up.service";
import {StructureService} from "./services/structure/structure.service";
import {Structure} from "./models/structure/structure";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ESSentiel';

  constructor(private popupService: PopUpService,
              private router: Router,
              private structureService: StructureService) { }

  gotoAddStructure() {
    this.router.navigate(['/add/structure']);
  }
}
