import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfigService } from './services/config/config.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { ModalControllerService } from './services/modal-controller/modal-controller.service';
// import { AlertModalComponent } from './helper-component/alert-modal/alert-modal.component';
import { SharedModule } from './shared/shared/shared.module';
registerLocaleData(en);

export function initConfigInfo(urlList: ConfigService) {
	return () => urlList.getConfigFile();
}

@NgModule({
	declarations: [
		AppComponent,
		NotFoundComponent,
		// AlertModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		SharedModule
	],
	providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: APP_INITIALIZER, useFactory: initConfigInfo, deps: [ConfigService], multi: true }, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
	// entryComponents: [AlertModalComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
