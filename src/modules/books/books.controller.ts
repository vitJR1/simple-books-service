import { Service } from 'typedi';
import {
  Body,
  Delete,
  Post,
  Put,
  Route,
  Security,
  Tags,
  Path,
  Get,
} from 'tsoa';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Accesses } from '../auth/accesses/Accesses';
import { BooksService } from './books.service';
import { BookObjectDto } from './dto/book-object.dto';

@Service()
@Tags('books')
@Route('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Security('jwt', [Accesses.CREATE])
  @Post('/books')
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookObjectDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @Get('/books/')
  async getBooksList(): Promise<BookObjectDto[]> {
    return await this.booksService.getBookList();
  }

  @Get('/books/:id')
  async getBookById(@Path() id: number): Promise<BookObjectDto> {
    return await this.booksService.getBookById(id);
  }

  @Security('jwt', [Accesses.UPDATE])
  @Put('/books/:id')
  async updateBook(
    @Path() id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookObjectDto> {
    return await this.booksService.updateBook(id, updateBookDto);
  }

  @Security('jwt', [Accesses.DELETE])
  @Delete('/books/:id')
  async deleteBook(@Path() id: number): Promise<'OK'> {
    return await this.booksService.deleteBook(id);
  }
}
