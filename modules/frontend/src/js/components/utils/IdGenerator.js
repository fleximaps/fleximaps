let idx = 1;

export default class IdGenerator{
    static generate(){
        idx++;

        return idx;
    }
}