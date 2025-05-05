package com.example.shop.sales;


import com.example.shop.item.ItemRepository;
import com.example.shop.member.CustomUser;
import com.example.shop.member.Member;
import com.example.shop.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class SalesController {

    private final SalesService salesService;
    private final MemberRepository memberRepository;


    @PostMapping("/order")
    String postOrder(@RequestParam String title,
                     @RequestParam Integer price,
                     @RequestParam Integer count,
                     @RequestParam Long id,
                     Authentication auth){

        salesService.addSales(title, price, count, id, auth);

        return "list.html";
    }


    @GetMapping("/order/all")
    String getOrderAll(){
//        List<Sales> result = salesRepository.customFindAll();
//        System.out.println(result.get(0));

        var result = memberRepository.findById(7L);
        System.out.println(result.get().getSales());

        return "list.html";
    }
}
