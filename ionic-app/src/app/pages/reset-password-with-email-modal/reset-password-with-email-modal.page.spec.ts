import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetPasswordWithEmailModalPage } from './reset-password-with-email-modal.page';

describe('ResetPasswordWithEmailModalPage', () => {
  let component: ResetPasswordWithEmailModalPage;
  let fixture: ComponentFixture<ResetPasswordWithEmailModalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordWithEmailModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordWithEmailModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
