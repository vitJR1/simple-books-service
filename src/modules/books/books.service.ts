import { Service } from 'typedi';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookObjectDto } from './dto/book-object.dto';
import prisma from '../../core/db';
import { StatusResponse } from '../utils/StatusResponse';
import { HandingError } from '../utils/HandingError';

@Service()
export class BooksService {
  private readonly defaultSelection = {
    id: true,
    author: true,
    title: true,
    genres: true,
    publicationDate: true,
  };

  async createBook(createBookDto: CreateBookDto): Promise<BookObjectDto> {
    return prisma.book.create({
      data: createBookDto,
      select: this.defaultSelection,
    });
  }
  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookObjectDto> {
    return prisma.book.update({
      data: updateBookDto,
      select: this.defaultSelection,
      where: { id },
    });
  }
  async deleteBook(id: number): Promise<StatusResponse> {
    return prisma.book.delete({ where: { id } }).then(() => ({
      status: 'OK',
    }));
  }
  async getBookList(): Promise<BookObjectDto[]> {
    return await prisma.book.findMany({
      select: this.defaultSelection,
    });
  }
  async getBookById(id: number): Promise<BookObjectDto | void> {
    return await prisma.book
      .findFirstOrThrow({
        where: {
          id,
        },
        select: this.defaultSelection,
      })
      .then((result) => ({ ...result }))
      .catch(() => {
        throw new HandingError('User not found', 404);
      });
  }
}
