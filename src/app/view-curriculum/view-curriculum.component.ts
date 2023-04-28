import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DepartmentService } from '../department-management/data-access/department.service';
import { SubjectService } from '../subject-management/data-access/subject.service';
import { CurriculumService } from '../curriculum-management/data-access/curriculum.service';
import { map, Observable, switchMap } from 'rxjs';
import { Subject } from '../subject-management/data-access/subject.model';
import { Curriculum } from '../curriculum-management/data-access/curriculum.model';
import { baseUrl } from '../shared/utils/api';

@Component({
  selector: 'app-view-curriculum',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-curriculum.component.html',
  styleUrls: ['./view-curriculum.component.scss'],
})
export class ViewCurriculumComponent implements OnInit {
  departments$ = this.departmentService.getDepartments();
  subjects$: Observable<Subject[]> = this.curriculumService
    .getCurriculums()
    .pipe(
      map(curriculums => curriculums.find(c => c.id === this.curriculum_id)),
      map(curriculum => curriculum?.subjects),
      switchMap(subjects =>
        this.subjectService
          .getSubjects()
          .pipe(
            map(allSubjects =>
              allSubjects.filter((s: Subject) =>
                subjects
                  ? subjects.findIndex((sub: Subject) => sub.code === s.code) >
                    -1
                  : false
              )
            )
          )
      ),
      map(subjects => subjects?.sort((a, b) => (a.term ?? 0) - (b.term ?? 0))),
      map(subjects =>
        subjects?.sort((a, b) => (a.year_level ?? 0) - (b.year_level ?? 0))
      )
    );

  yearTerm$ = this.subjects$.pipe(
    map(subjects =>
      subjects?.map(s => {
        return {
          year: s.year_level,
          term: s.term,
          unit: s.units,
          hour: s.hours,
        };
      })
    ),
    map(terms => {
      return terms?.map((term, index, self) => {
        return {
          year: term?.year,
          term: term?.term,
          unit: self
            ?.filter(t => t.year === term?.year && t.term === term?.term)
            .reduce((a, b) => a + (b?.unit ?? 0), 0),
          hour: self
            ?.filter(t => t.year === term?.year && t.term === term?.term)
            .reduce((a, b) => a + (b?.hour ?? 0), 0),
        };
      });
    }),
    map(terms => {
      return terms?.filter((term, index, self) => {
        return (
          self.findIndex(
            t => t.year === term?.year && t.term === term?.term
          ) === index
        );
      });
    })
  );

  curriculum$: Observable<Curriculum | undefined> | undefined = undefined;
  curriculum_id: number = -1;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private subjectService: SubjectService,
    private curriculumService: CurriculumService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.curriculum_id = parseInt(id);
        this.curriculum$ = this.curriculumService
          .getCurriculums()
          .pipe(
            map(curriculums =>
              curriculums.find(c => c.id === this.curriculum_id)
            )
          );
      }
    });

    this.departmentService.init();
    this.subjectService.init();
    this.curriculumService.init();
  }

  getLink(name: string) {
    return baseUrl + '/uploads/' + name;
  }
}
