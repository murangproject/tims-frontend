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
  role: string = '';
  roleType: string = '';
  ngOnInit(): void {
    const comment = this.commentInput;
    this.cardComment = comment;
    this.fullname = `${comment.user?.first_name} ${comment.user?.last_name}`;
    this.date = new Date(comment.created_at ?? '').toLocaleString('default', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    this.content = comment.content ?? '';
    this.role = comment.user?.role_name ?? '';
    this.roleType = comment.user?.role_type ?? '';
  }

  getBadgeColor(roleType: string) {
    console.log(roleType);
    switch (roleType) {
      case 'admin':
        return 'badge-accent text-accent-content';
      case 'committee_chair':
        return 'badge-success text-success-content';
      case 'committee_member':
        return 'badge-info text-info-content';
      case 'stakeholder':
        return 'badge-warning text-warning-content';
      default:
        return 'badge-accent text-accent-content';
    }
  }
}
