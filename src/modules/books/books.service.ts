import { Service } from 'typedi';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookObjectDto } from './dto/book-object.dto';

@Service()
export class BooksService {
  async createBook(createBookDto: CreateBookDto): Promise<BookObjectDto> {
    return {
      id: 1,
      title: createBookDto.title,
      author: createBookDto.author,
      publicationDate: new Date(createBookDto.publicationDate),
      genres: createBookDto.genres,
    };
  }
  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookObjectDto> {
    return {
      id: 1,
      title: 'title',
      author: 'John Doe',
      genres: ['comedy', 'horror'],
      ...updateBookDto,
      publicationDate: new Date(updateBookDto.publicationDate ?? new Date()),
    };
  }
  async deleteBook(id: number): Promise<'OK'> {
    return 'OK';
  }
  async getBookList(): Promise<BookObjectDto[]> {
    return [
      {
        id: 1,
        title: 'title',
        author: 'John Doe',
        genres: ['comedy', 'horror'],
        publicationDate: new Date(),
      },
      {
        id: 2,
        title: 'Harry Potter',
        author: 'Kafka',
        genres: ['comedy'],
        publicationDate: new Date(),
      },
    ];
  }
  async getBookById(id: number): Promise<BookObjectDto> {
    return {
      id,
      title: 'title',
      author: 'John Doe',
      genres: ['comedy', 'horror'],
      publicationDate: new Date(),
    };
  }
}
