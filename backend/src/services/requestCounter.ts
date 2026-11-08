export class RequestCounter {
  private value = 0;

  increment(): void {
    this.value += 1;
  }

  rollback(): void {
    if (this.value > 0) {
      this.value -= 1;
    }
  }

  shouldInvalidate(): boolean {
    return this.value > 0 && this.value % 4 === 0;
  }
}

export const dictionaryRequestCounter = new RequestCounter();
