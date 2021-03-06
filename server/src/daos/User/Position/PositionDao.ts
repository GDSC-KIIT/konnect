import { IPosition } from '@entities/Position';
import insertPosition from './insertPosition';
import getAllPositions from './getAllPositions';
import getPosition from './getPosition';
import deletePosition from './deletePosition';
import updatePosition from './updatePosition';

export interface IPositionDao {
    getAll: (key: string) => Promise<IPosition[]>;
    get: (key: string, positionid: string) => Promise<IPosition | null>;
    add: (key: string, position: IPosition) => Promise<void>;
    update: (key: string, position: IPosition) => Promise<void>;
    delete: (key: string, positionid: string) => Promise<void>;
}

class PositionDao implements IPositionDao {
    /**
     * @param key
     */
    public getAll(key: string): Promise<IPosition[]> {
        let content = getAllPositions(key);
        return Promise.resolve(content);
    }

    /**
     * @param key
     * @param positionid
     */
    public get(key: string, positionid: string): Promise<IPosition | null> {
        let content = getPosition(key, positionid);
        return Promise.resolve(content);
    }

    /**
     * @param key
     * @param position
     */
    public async add(key: string, position: IPosition): Promise<void> {
        await insertPosition(key, position);
        return Promise.resolve(undefined);
    }

    /**
     * @param key
     * @param position
     */
    public async update(key: string, position: IPosition): Promise<void> {
        await updatePosition(key, position);
        return Promise.resolve(undefined);
    }

    /**
     * @param key
     * @param positionid
     */
    public async delete(key: string, positionid: string): Promise<void> {
        await deletePosition(key, positionid);
        return Promise.resolve(undefined);
    }
}

export default PositionDao;
