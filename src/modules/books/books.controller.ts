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
  Middlewares,
} from 'tsoa';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Accesses } from '../auth/accesses/Accesses';
import { BookObjectDto } from './dto/book-object.dto';
import { BooksService } from './books.service';
import { StatusResponse } from '../utils/StatusResponse';
import { bodyValidationPipe } from '../utils/bodyValidationPipe';

@Service()
@Tags('books')
@Route('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Middlewares(bodyValidationPipe(CreateBookDto))
  @Security('jwt', [Accesses.CREATE])
  @Post('')
  async createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BookObjectDto> {
    return await this.booksService.createBook(createBookDto);
  }

  @Get('/')
  async getBooksList(): Promise<BookObjectDto[]> {
    return await this.booksService.getBookList();
  }

  @Get('/:id')
  async getBookById(@Path() id: number): Promise<BookObjectDto | void> {
    return await this.booksService.getBookById(id);
  }

  @Middlewares(bodyValidationPipe(UpdateBookDto))
  @Security('jwt', [Accesses.UPDATE])
  @Put('/:id')
  async updateBook(
    @Path() id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookObjectDto> {
    return await this.booksService.updateBook(id, updateBookDto);
  }

  @Security('jwt', [Accesses.DELETE])
  @Delete('/:id')
  async deleteBook(@Path() id: number): Promise<StatusResponse> {
    return await this.booksService.deleteBook(id);
  }
}
