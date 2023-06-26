import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
  btnText = 'Share!'

  constructor(
    private momentService: MomentService,
    private router: Router,
    private messageService: MessagesService) {
  }

  async createHandler(moment: Moment) {
    const formData = new FormData()

    formData.append('title', moment.title)
    formData.append('description', moment.description)

    if (moment.image) {
      formData.append('image', moment.image)
    }

    await this.momentService.createMoment(formData).subscribe();
    this.messageService.add("Moment added successfully!")

    this.router.navigate(['/'])
  }

}
