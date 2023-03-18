import { Component, Input, OnInit } from '@angular/core';
import { ModalsService } from 'neercms/services/viewport';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  providers: [ArticleService],
})
export class ArticleFormComponent implements OnInit {
  @Input() model!: any;

  locked: boolean = true;

  constructor(
    public readonly articleService: ArticleService,
    private readonly modals: ModalsService,
  ) {}

  ngOnInit(): void {
    this.articleService.loadMetadata();
    this.articleService.form.setValue(this.model);
  }

  submit() {
    this.articleService.update();
    this.model = this.articleService.form.getRawValue();
  }
}
