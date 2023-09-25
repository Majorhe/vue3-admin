<?php

public function commentList(Request $request){
    err_unless($request -> has(['book_id']), '缺少参数');

    $pagesize = $request->has('page_num') && intval($request->page_num) > 0 ? $request->page_num : 20;
    // 获取图书列表
    $paginator = BookBorrowingComment::select('book_borrowing_comment.*, user.name as username')
        ->join('user', 'book_borrowing.user_id', '=',  'user.id')
        ->orderBy('book_borrowing_comment.created_time','desc')
        ->paginate($pagesize);
    $data = $paginator->map(fn ($query) => [
        'id'=>$query->id,
        'username'=>$query->username,
        'rate'=>$query->rate,
        'comment'=>$query->comment,
        'created_date'=>$query->created_date
    ]);
    return success([
        'data'=>$data,
        'total'=>$paginator->total(),
        'last_page'=>$paginator->lastPage(),
        'current_page'=>$paginator->currentPage()
    ]);
}

// 添加/编辑
public function comment(Request $request) {
    err_unless($request -> has(['borrowing_id', 'rate', 'comment']), '缺少参数');

    // 判断用户是否已经归还图书
    $borrowing = BookBorrowing::where('id', $request->borrowing_id)
        ->where('user_id', Auth::user()->id)
        ->where('status', 2)
        ->first();
    if (!$borrowing) {
        return  error("抱歉您租借的图书库存不足");
    }
    // 保存评价信息
    $data = [
        'book_id' => $borrowing->book_id,
        'user_id' => Auth::user()->id,
        'borrowing' => $request->borrowing_id,
        'rate' => $request->rate,
        'comment' => $request->comment
    ];
    BookBorrowingComment::save($data);

    return success('评价成功');
}

// 图书归还
public function bookReturn(Request $request){
    err_unless($request -> has(['id']), '缺少参数');
    DB::transaction(function () use ($request) {
        // 修改图书归还
        BookBorrowing::update([
            'return_date' => new Date(),
            'return_remark' => '图书归还',
            'status' => 2
        ])
        ->where('id', $request->id)
        ->where('user_id', $request->header('token'));
        // 添加库存
        Book::increment('stock');
    });
    return success('图书归还成功');
}
