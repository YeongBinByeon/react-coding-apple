package com.example.shop.sales;

import com.example.shop.member.Member;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class Sales {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String itemName;
    private Integer price;
    private Integer count;
    @ManyToOne
    @JoinColumn(
            name = "member_id",
            foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT)
    )
    private Member member;
    @CreationTimestamp
    private LocalDateTime created;

}
