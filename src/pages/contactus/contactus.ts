import {NavController, ViewController, Platform, LoadingController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {Component} from "@angular/core";

@Component({
  selector: 'contactus',
  templateUrl: 'contactus.html'
})
export class ContactusPage {
  nav: NavController;
  viewCtrl: ViewController;
  contactForm: FormGroup;
  email: AbstractControl;
  browser: boolean = true;
  apidata: any;
  loader: any;

  constructor(private platform: Platform, public nav_: NavController, fb_: FormBuilder, viewCtrl_: ViewController, public loadingCtrl: LoadingController) {
    this.nav = nav_;
    this.viewCtrl = viewCtrl_;
    this.contactForm = fb_.group({
      email: ['', Validators.compose([Validators.required, this.emailValidator])]
    });
    this.email = this.contactForm.controls['email'];
    this.browser = platform.is('core');

    this.apidata = {};
    this.apidata.model = '';
    this.apidata.platform = '';
    this.apidata.version = '';
    this.apidata.uuid = '';
    this.apidata.language = '';
    this.apidata.appName = 'ezTipNSplit';

    this.platform.ready().then(() => {

    });
  }

  closeContactus() {
    this.viewCtrl.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 5000
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  doSubscribe() {
    this.presentLoading();

    //do your server side form submission and processing..

    this.hideLoading();
  }

  emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return {'invalidEmailAddress': true};
    }
  }
}
