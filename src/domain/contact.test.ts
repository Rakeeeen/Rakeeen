import { describe, expect, it } from 'vitest';
import { cleanInquiry, inquiryProblem, plainLabel } from '@/domain/contact';

const valid = { name: 'Hamed', email: 'h@example.com', message: 'Hello' };

describe('inquiryProblem', () => {
  it('accepts a complete message', () => {
    expect(inquiryProblem(valid)).toBeNull();
  });

  it('reports a missing field, including one that is only spaces', () => {
    expect(inquiryProblem({ ...valid, name: '' })).toBe('missing');
    expect(inquiryProblem({ ...valid, message: '   ' })).toBe('missing');
  });

  it('reports an email that is not shaped like one', () => {
    expect(inquiryProblem({ ...valid, email: 'hamed' })).toBe('email');
    expect(inquiryProblem({ ...valid, email: 'a@b' })).toBe('email');
  });
});

describe('cleanInquiry', () => {
  it('trims every field', () => {
    expect(cleanInquiry({ name: ' A ', email: ' a@b.co ', message: ' hi\n' })).toEqual({ name: 'A', email: 'a@b.co', message: 'hi' });
  });
});

describe('plainLabel', () => {
  it('turns line-break tags into a space', () => {
    expect(plainLabel('Send<br/>It!')).toBe('Send It!');
    expect(plainLabel('طَيَّر<br>الرسالة')).toBe('طَيَّر الرسالة');
  });
});
