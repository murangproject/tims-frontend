import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentInfo, CreateCommentDto } from './comment.model';
import { commentEndpoint } from 'src/app/shared/utils/api';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  create(createCommentDto: CreateCommentDto) {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };

    return this.http.post<{ message: string }>(
      `${commentEndpoint}`,
      createCommentDto,
      { headers }
    );
  }
}
