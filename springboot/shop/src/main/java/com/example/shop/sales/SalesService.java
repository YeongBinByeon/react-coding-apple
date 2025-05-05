package com.example.shop.sales;

import com.example.shop.item.ItemRepository;
import com.example.shop.member.CustomUser;
import com.example.shop.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final ItemRepository itemRepository;
    private final SalesRepository salesRepository;

    @Transactional
    public void addSales(String title, Integer price, Integer count, Long id, Authentication auth) {
        // 재고를 1 빼기
        var result = itemRepository.findById(id);
        if(result.isPresent()){
            var item = result.get();
            item.setCount(item.getCount() - 1);
            itemRepository.save(item);
        }

        if(true){

            throw new RuntimeException("exception");
        }


        Sales sales = new Sales();
        sales.setCount(count);
        sales.setPrice(price);
        sales.setItemName(title);
        
        // 강의 예제에서 인증방식을 세션에서 JWT로 바꿔서 아래처럼은 인증 정보 가져올 수 없게 되어서 주석처리함
        //CustomUser user = (CustomUser) auth.getPrincipal();

        var member = new Member();
//        member.setId(user.id);
        member.setId(3L);

        sales.setMember(member);

        salesRepository.save(sales);
    }
}
