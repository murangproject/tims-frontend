import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentInfo } from '../curriculum-management/data-access/comment.model';
import { User } from '../user-management/data-access/users.model';

@Component({
  selector: 'app-feedback-comment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback-comment.component.html',
})
export class FeedbackCommentComponent implements OnInit {
  @Input() commentInput: CommentInfo = {};

  cardComment: CommentInfo = {};

  fullname: string = '';
  date: string = '';
  content: string = '';
  ngOnInit(): void {
    console.log(this.commentInput);
    const comment = this.commentInput;
    this.cardComment = comment;
    this.fullname = `${comment.user?.first_name} ${comment.user?.last_name}`;
    this.date = new Date(comment.created_at ?? '').toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    this.content = comment.content ?? '';
  }
}
