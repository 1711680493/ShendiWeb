# StorageLocal 封装类

> storageL.js是源码
>
> storageL.min.js是压缩后的文件,实际应用使用这个
>
> 支持设置超时时间，数据已满自动删除最先存入数据，分组
>
> [StorageL v1.0 ](https://1711680493.github.io/)changed in 2021-11-10



## API

#### storageL.group

分组名称

```
当此项不为空,设置数据超过最大数据限制则会删除此组最先存入的数据然后再存入.
当此项为空,设置数据超过最大数据限制则清除所有数据中最先存入的数据后再存入.
```



> 当设置了分组时，存储的 key 会以 分组-key 的格式。



#### storageL.get()

