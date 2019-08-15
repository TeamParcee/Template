import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, PopoverController, ModalController } from '@ionic/angular';
import { AlertInput } from '@ionic/core';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
  ) { }


  showLoading() {

    this.loadingCtrl.create();
  }
  hideLoading() {
    this.loadingCtrl.dismiss();
  }
  openModal(component, componentProps) {
    this.modalCtrl.create({
      component: component,
      componentProps: componentProps
    }).then((modal) => {
      modal.present();
    })
  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  okAlert(header: string, message: string) {
    this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ["OK"]
    }).then((alert) => {
      alert.present();
    })
  }

  confirmationAlert(header: string, message: string, buttons: { denyText: string, confirmText: string }) {

    return new Promise((resolve) => {
      this.alertCtrl.create({
        header: header,
        message: message,
        buttons: [
          {
            text: buttons.denyText,
            handler: () => {
              return resolve(false)
            }
          }, {
            text: buttons.confirmText,
            handler: () => {
              return resolve(true)
            }
          }
        ]
      }).then((alert) => {
        alert.present();
      })
    })

  }

  generateid() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  inputAlert(header: string, message: string, inputs: AlertInput[]) {
    return new Promise(async (resolve) => {
      let alert = await this.alertCtrl.create({
        header: header,
        message: message,
        inputs: inputs,
        buttons: [
          {
            text: "Cancel",
            role: 'cancel'
          }, {
            text: "Save",
            handler: (result) => {
              alert.dismiss(result.name)
              return resolve(result.name)
            }
          }
        ]
      })
      alert.present()
    })


  }

  presentPopover(ev: Event, component) {

    return new Promise((resolve) => {
      return this.popoverCtrl.create({
        component: component,
        event: ev,
        translucent: true
      }).then((popover) => {
        popover.present();
        popover.onDidDismiss().then((result) => {
          return resolve(result);
        })
      })
    })

  }
  closePopover() {
    this.popoverCtrl.dismiss();
  }
  closePopoverWithData(data) {
    this.popoverCtrl.dismiss(data)
  }
  getPopoverData() {
  }
  showToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2500,
      position: "bottom",
    }).then((toast) => {
      toast.present();
    })
  }
}
