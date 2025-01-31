import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private tagRepository: Repository<TagEntity>,
    ) {}

    async getTags(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }
}
