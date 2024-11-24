// Базовий інтерфейс
interface BaseContent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

// Тип для статті
interface Article extends BaseContent {
  title: string;
  content: string;
  author: string;
  tags: string[];
}

// Тип для продукту
interface Product extends BaseContent {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

// Generic для операцій
type ContentOperations<T extends BaseContent> = {
  create: (item: T) => T;
  read: (id: string) => T | null;
  update: (id: string, updates: Partial<T>) => T | null;
  delete: (id: string) => boolean;
};

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

// Контроль доступу
type AccessControl<T extends BaseContent> = {
  [role in Role]: {
    [key in keyof Permission]: (content: T) => boolean;
  };
};

// Приклад системи для Article
const articleAccessControl: AccessControl<Article> = {
  admin: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  editor: {
    create: () => true,
    read: () => true,
    update: (content) => content.status !== 'archived',
    delete: () => false,
  },
  viewer: {
    create: () => false,
    read: (content) => content.status === 'published',
    update: () => false,
    delete: () => false,
  },
};

// Базовий тип валідатора
type Validator<T> = {
  validate: (data: T) => ValidationResult;
};

type ValidationResult = {
  isValid: boolean;
  errors?: string[];
};

// Валідатор для статей
const articleValidator: Validator<Article> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.title) errors.push('Title is required.');
    if (!data.content) errors.push('Content is required.');
    return { isValid: errors.length === 0, errors };
  },
};

// Валідатор для продуктів
const productValidator: Validator<Product> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.name) errors.push('Name is required.');
    if (data.price <= 0) errors.push('Price must be greater than zero.');
    return { isValid: errors.length === 0, errors };
  },
};

// Універсальний валідатор
function validateContent<T extends Article | Product>(
  content: T
): ValidationResult {
  if ('title' in content) {
    return articleValidator.validate(content as Article);
  }
  if ('name' in content) {
    return productValidator.validate(content as Product);
  }
  return { isValid: false, errors: ['Unknown content type'] };
}

// Підтримка версіонування
type Versioned<T extends BaseContent> = T & {
  version: number;
  previousVersions: Array<Versioned<T>>;
  saveVersion: () => void;
};

// Реалізація версіонування
function createVersioned<T extends BaseContent>(content: T): Versioned<T> {
  const versionedContent = {
    ...content,
    version: 1,
    previousVersions: [] as Array<Versioned<T>>,
    saveVersion() {
      const previousVersion = { ...this } as Versioned<T>;
      previousVersion.previousVersions = []; // очищуємо, щоб уникнути циклічності
      this.previousVersions.push(previousVersion);
      this.version++;
    },
  };
  return versionedContent as Versioned<T>;
}

// Приклад
const versionedArticle = createVersioned<Article>({
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'draft',
  title: 'Example Article',
  content: 'Lorem ipsum...',
  author: 'John Doe',
  tags: ['example', 'typescript'],
});

versionedArticle.saveVersion();
versionedArticle.status = 'published';
versionedArticle.saveVersion();

console.log(versionedArticle);