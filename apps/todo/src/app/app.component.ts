import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule, TranslateModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const browserLang = translate.getBrowserLang()!;
    console.log('Browser language:', browserLang);
    // translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }
}
