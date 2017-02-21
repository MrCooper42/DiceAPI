import { TestBed, inject } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  it('should ...', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));
});
